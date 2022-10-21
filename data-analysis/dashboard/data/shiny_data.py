print('Importing modules')
import json
import urllib.request
import pandas as pd


print('Downloading 2021 property assessment data')
prop_assess = pd.read_csv('https://data.boston.gov/dataset/e02c44d2-3c64-459c-8fe2-e1ce5f38a035/resource/c4b7331e-e213-45a5-adda-052e4dd31d41/download/data2021-full.csv', dtype=object)

print('Filtering property assessment data')
prop_assess = prop_assess.loc[
  (prop_assess['CITY'].isin(['MATTAPAN', 'DORCHESTER', 'ROXBURY', 'ROXBURY CROSSIN'])) & 
  (prop_assess['LU_DESC'].isin(['THREE-FAM DWELLING', 'TWO-FAM DWELLING', 'SINGLE FAM DWELLING'])) & 
  (prop_assess['OWN_OCC'] == 'Y'), 
  ['CITY', 'LU', 'LU_DESC', 'OWN_OCC', 'HEAT_TYPE', 'AC_TYPE', 'RES_FLOOR', 'YR_REMODEL', 'YR_BUILT', 'FIRE_PLACE', 'BLDG_TYPE', 'STRUCTURE_CLASS', 'INT_WALL', 'INT_COND', 'LAND_SF', 'TT_RMS', 'GROSS_AREA', 'LIVING_AREA', 'EXT_COND', 'BED_RMS','EXT_FINISHED','HEAT_FUEL', 'PID', 'GIS_ID']]

print('Writing property assessment data')
prop_assess.to_csv('2021_property_assessment.csv')

print('Downloading 2021 parcel data')
parcels = json.load(urllib.request.urlopen("https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::parcels-2021.geojson"))

print("Adding GIS_ID as feature 'id'")
[f.update({'id' : f['properties'].pop('MAP_PAR_ID')}) for f in parcels['features']]

print('Filtering features')
parcels['features'] = [f for f in parcels['features'] if f['id'] in prop_assess['GIS_ID'].tolist()]

print('Writing parcel data')
json.dump(parcels, open('2021_parcels.geojson', 'w'))

print('Done!')