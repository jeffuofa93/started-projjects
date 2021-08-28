Jeff Wiederkehr
# Sample Project

This project takes a CSV file uploads it into ArcGIS pro, adds the data to an arcGIS map, conditionally formats the data
based on the safety rating and then exports the updated map to ArcGIS Online.

## Issues/Improvements
1. Displaying data on map from CSV when executed externally:<br>
I was unable to resolve this issue. Under this implementation the coordinates are added to map automatically only when
run directly in ArcGIS pro. If ran in an outside python environment with proper configuration the CSV is added to the
project, but the data is not added to the map and has to be added manually

2. Conditionally formatting circle color based on CSV values in a single layer:<br>
I was unable to achieve functionality in arcpy to add conditional formatting of individual circles under a single layer.
My solution as implemented is to create three separate layers for circles that are green, yellow and red respectively
and to add the colors to the separate layers. Also, I set the original layer of the coordinates to invisible. There was
a very simple solution in ArcGIS itself using Arcade to conditionally format, but I felt it somewhat missed the intention
of the assignment of working in arcpy.

3. Uploading Project to ArcGIS Online:<br>
I experienced some difficulties in uploading to ArcGIS Online. The main issue was connection to the server correctly.
I was receiving <b>Value Error: </b> "Target server is not a standalone server" error. I switched the code to
CreateWebLayer API call and it works as expected. Improvement would be to switch to arcpy.sharing API calls


## Usage
Note: Current implementation requires python scripts to be run inside ArcGIS. ArcGIS project is located in MyProjectTest.zip

The code as implemented performs all functionality for a single CSV file with a hardcoded location at in_table in
block 1. Run the first code block to add the CSV file to ArcGIS with all formatting. After running block 1 run code
block 2 to upload the new map into ArcGIS Online.
