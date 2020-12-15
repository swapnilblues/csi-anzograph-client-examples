"""
Original Demo: http://js.cytoscape.org/demos/grid-layout/
"""
import json

import dash
import dash_html_components as html

import dash_cytoscape as cyto

app = dash.Dash(__name__)
server = app.server

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True

# Load Data
with open('data/grid-layout/data.json', 'r') as f:
    elements = json.loads(f.read())

# App
app.layout = html.Div([
    cyto.Cytoscape(
        id='cytoscape',
        elements=elements,
        layout={'name': 'grid'},
        stylesheet=[{
            'selector': 'node',
            'style': {
                'height': 20,
                'width': 20,
                'background-color': '#18e018'
            }
        }, {
            'selector': 'edge',
            'style': {
                'curve-style': 'haystack',
                'haystack-radius': 0,
                'width': 5,
                'opacity': 0.5,
                'line-color': '#a2efa2'
            }
        }],
        style={
            'width': '100%',
            'height': '100%',
            'position': 'absolute',
            'left': 0,
            'top': 0,
            'z-index': 999
        }
    )
])

if __name__ == '__main__':
    app.run_server(debug=True)
