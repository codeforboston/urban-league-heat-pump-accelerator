from htmltools import css
from shiny import App, ui
from shinywidgets import output_widget, register_widget
from branca.colormap import linear

import pandas as pd
import geopandas as gp
import ipyleaflet as L
import pathlib
import json

app_ui = ui.page_fluid(

    ui.div(
        ui.h1("2021 Boston Parcel & Property Assessment Data"),
        style=css(
            display="flex", justify_content="center", align_items="center", gap="2rem"
        ),
    ),
    output_widget("map"),
)


def server(input, output, session):
    
    dir = pathlib.Path(__file__).parent

    property = gp.read_file(dir / 'data/2021_parcels_property-assessment.geojson')

    def load_data(filename, file_type):
        with open(filename, 'r') as f:
            return file_type(f)
    
    age = L.Choropleth(
        geo_data = load_data(dir / 'data/2021_parcels_property-assessment.geojson', json.load),
        choro_data = dict(zip(property['GIS_ID'], property['YR_BUILT'].astype(float))),
        key_on = "properties['GIS_ID']",
        colormap = linear.YlOrRd_04,
        style={'fillOpacity': .7}
        )
    
    # Initialize and display when the session starts (1)
    map = L.Map(basemap=L.basemaps.Stamen.Toner, zoom=12, scroll_wheel_zoom=True, center=(42.34558, -70.89395))
    # Add parcel layers; will grow more lines as needed
    map.add_layer(age)
    # Add layer control
    map.add_control(L.LayersControl(position="topright"))
    register_widget("map", map)

app = App(app_ui, server)