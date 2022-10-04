from htmltools import css
from shiny import App, reactive, render, ui
from shinywidgets import output_widget, reactive_read, register_widget

import pandas as pd
import geopandas as gp
import ipyleaflet as L

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
    
    parcels = gp.read_file("https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::parcels-2021.geojson?outSR=%7B%22latestWkid%22%3A2249%2C%22wkid%22%3A102686%7D")

    parcels = parcels[parcels['MAP_PAR_ID'] == 'ISLAND']

    geo_data = L.GeoData(geo_dataframe=parcels,
    style={'stroke': False, 'fillColor': '#FF0000', 'fillOpacity': 0.5},
    name = 'Parcels')
    
    # Initialize and display when the session starts (1)
    map = L.Map(basemap=L.basemaps.Stamen.Toner, zoom=12, scroll_wheel_zoom=True, center=(42.34558, -70.89395))
    # Add parcel layers
    map.add_layer(geo_data)
    # Add layer control
    map.add_control(L.LayersControl(position="topright"))
    register_widget("map", map)

app = App(app_ui, server)