import requests

import dash
import dash_html_components as html
import dash_cytoscape as cyto

app = dash.Dash(__name__)

# Request the data from the sample network
url = 'https://raw.githubusercontent.com/plotly/dash-cytoscape/master/demos/data/sample_network.txt'
data = requests.get(url).text.split('\n')


nodes = set()
cy_edges, cy_nodes = [], []
edges = data[:500]
colors = ['red', 'blue', 'green', 'yellow', 'pink']

for edge in edges:
    source, target = edge.split(" ")
    color = colors[len(cy_nodes) % 5]

    if source not in nodes:  # Add the source node
        nodes.add(source)
        cy_nodes.append({"data": {"id": source}, "classes": color})

    if target not in nodes:  # Add the target node
        nodes.add(target)
        cy_nodes.append({"data": {"id": target}, "classes": color})

    cy_edges.append({  # Add the Edge Node
        'data': {'source': source, 'target': target},
        'classes': color
    })


default_stylesheet = [
    {
        "selector": 'node',
        'style': {
            "opacity": 0.9,
            'height': 15,
            'width': 15,
            'background-color': '#222222'
        }
    },
    {
        "selector": 'edge',
        'style': {
            "curve-style": "bezier",
            "opacity": 0.3,
            'width': 2
        }
    },
    *[{
        "selector": '.' + color,
        'style': {'line-color': color}
    } for color in colors]
]

app.layout = html.Div([
    cyto.Cytoscape(
        id='cytoscape',
        elements=cy_edges + cy_nodes,
        stylesheet=default_stylesheet,
        layout={
            'name': 'grid',
            'rows': 15
        },
        style={'height': '95vh', 'width': '100%'}
    )
])


if __name__ == '__main__':
    app.run_server(debug=True)
