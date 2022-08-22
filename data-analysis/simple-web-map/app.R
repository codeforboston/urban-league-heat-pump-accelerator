library(shiny)
library(sf)
library(tmap)
library(dplyr)
library(tidyr)
library(stringr)
library(magrittr)

# Define UI for application that draws a histogram
ui <- fluidPage(

    # Application title
    h1("2021 Boston Parcel & Property Assessment Data"),

    # Sidebar with a slider input for number of bins 
    tmapOutput(outputId = 'map4')
)

# Define server logic required to draw a histogram
server <- function(input, output) {
  
  property <- readRDS('data/2021/property.RData') %>%
    filter(OWN_OCC == 'Y') %>%
    unite('address', c('ST_NUM', 'ST_NAME'), sep = ' ') %>%
    mutate('Year Built (From 1990)' = coalesce(YR_REMODEL, YR_BUILT)-1990)
  
  output$map4 <- renderTmap({
    tm_shape(property) +
    tm_fill(c('HEAT_TYPE', 'AC_TYPE', 'Year Built (From 1990)', 'LU_DESC'), id = 'address', popup.vars = c('YR_BUILT', 'HEAT_TYPE', 'AC_TYPE')) +
    tm_facets(as.layers = TRUE) +
    tm_basemap(server = 'OpenStreetMap', alpha = .4) +
    tm_view(bbox = 'Mattapan, Boston')
  })
}

# Run the application 
shinyApp(ui = ui, server = server)
