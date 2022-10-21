from htmltools import css
from shiny import App, ui
from shinywidgets import output_widget, register_widget
from branca.colormap import linear

import pandas as pd
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

    prop_assess = pd.read_csv(dir / 'data/2021_property_assessment.csv', dtype=object)

    years = dict(zip(prop_assess['GIS_ID'].astype(str), prop_assess['YR_BUILT'].astype(float)))

    def load_data(filename, file_type):
        with open(filename, 'r') as f:
            return file_type(f)

    parcels = load_data(dir / 'data/2021_parcels.geojson', json.load)

    parcels['features'] = [f for f in parcels['features'] if f['id'] in years.keys()]
    
    age = L.Choropleth(
        geo_data = parcels,
        choro_data = years,
        colormap = linear.YlOrRd_04,
        style={'fillOpacity': 0.8}
        )
    
    # Initialize and display when the session starts (1)
    map = L.Map(basemap=L.basemaps.Stamen.Toner, zoom=14, scroll_wheel_zoom=True, center=(42.32105, -71.06898))
    # Add parcel layers; will grow more lines as needed
    map.add_layer(age)
    # Add layer control
    map.add_control(L.LayersControl(position="topright"))
    register_widget("map", map)

app = App(app_ui, server)