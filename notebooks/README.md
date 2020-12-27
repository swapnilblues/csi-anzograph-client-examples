# Jupyter Visualization for AnzoGraph

### To run the application:
1. Make sure AnzoGraph is running on `localhost:7070`.
2. Make sure python 3.6 is loaded in the system.
3. Install the following python packages:
    + `pip install notebook`
    + `pip install pandas`
    + `pip install dash-cytoscape`
    + `pip install jupyter-dash`
4. To start Jupyter Notebook run `jupyter notebook`.


### Graph Browser Notebook
+ File: `/GraphBrowser/ViewGraphBrowser.inpynb`

### Screenshots:

#### Covid data of every US state in a choropleth map with time-slider:
![](https://github.com/swapnilblues/csi-anzograph-client-examples/blob/main/ScreenShots/Choropleth.png)

#### Graph Browser:
![](https://github.com/swapnilblues/csi-anzograph-client-examples/blob/main/ScreenShots/graph-browser.png)

##### NOTE: The file `dash_reusable_components.py` present in this directory and inside `GraphBrowser` is taken from the plotly/dash-cytoscape repo and uses an MIT license.  [File link in original repo](https://github.com/plotly/dash-cytoscape/blob/master/demos/dash_reusable_components.py)
 
###### Developed by Cambridge Semantics Inc.     