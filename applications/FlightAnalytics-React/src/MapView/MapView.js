import React from "react";
import "../Dashboard/dashboard.css"
import { Button } from '@material-ui/core';
import Icon from "@material-ui/core/Icon";
import Select from 'react-select'
import {WorldMap} from "./WorldMap";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import {Link} from "react-router-dom";
import Tab from "@material-ui/core/Tab";


class MapView extends React.Component {


    componentDidMount = async () => {
        this.loadAirports()
    }

    changeOrigin = (selectedItem) => {
        this.setState({
            origin: selectedItem.value
        });
    }

    changeDestination = (selectedItem) => {
        this.setState({
            destination: selectedItem.value
        });
    }

    state = {
        origin : 'All',
        destination : 'All',
        startLabel: '',
        endLabel: '',
        result: {status: '', value: {heads: {vars: []}, results: {bindings: []}}, h: [], v: [], err: '', xmlOutput: ''},
        airports: [{value:'All', label:'All'}],
        layOver: [],
        layOverTest: [],
        directFlight: '',
        orgLat: '',
        orgLong: '',
        destLat: '',
        destLong: '',
        query: '',
        curr : -1
    }


    loadAirports = async () => {
        const f1 = new URLSearchParams()
        let query = 'PREFIX : <https://ontologies.semanticarts.com/raw_data#> \n' +
            'PREFIX fl: <https://ontologies.semanticarts.com/flights/> \n' +
            'PREFIX owl: <http://www.w3.org/2002/07/owl#> \n' +
            'PREFIX skos:  <http://www.w3.org/2004/02/skos/core#>\n' +
            'SELECT DISTINCT\n' +
            ' ?airport_code ?airport_city ?lat ?lng # ?airport_country\n' +
            'FROM <airline_flight_network>\n' +
            'WHERE {\n' +
            ' [ a fl:Airport ;\n' +
            '  fl:terminalCode ?airport_code ;\n' +
            '  :lat ?lat ;\n' +
            '  :long ?lng ;\t\n' +
            '  fl:locatedIn [ a fl:City;\n' +
            '   skos:prefLabel ?airport_city;\n' +
            '   fl:locatedIn [ a fl:Country;\n' +
            '    skos:prefLabel ?airport_country\n' +
            '   ]\n' +
            '  ]\n' +
            ' ]\n' +
            ' filter(?airport_country = "United States")\n' +
            ' filter(strlen(?airport_code) = 3)\n' +
            '}\n' +
            'ORDER BY\n' +
            ' ?airport_city\n' +
            ' ?airport_code\n'
        await f1.append('query', query)
        await f1.append('output', 'json')
        await fetch(`http://localhost:7070/sparql`, {
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: f1
            }
        )
            .then(async (response) => {
                if (response.status === 200) {
                    let c = await response.json()
                    console.log("AANew",c)
                    let datas = c.results.bindings
                    for(let i=0; i<datas.length;i++) {
                        let curr = datas[i].airport_code.value
                        await this.setState({
                            airports: [...this.state.airports, {
                                value: curr,
                                label: curr + " - " + datas[i].airport_city.value
                            }],
                        })
                    }
                }
            })
    }

    //all possible routes

    createDataForAllRoutes = (origin,destination) => {
        const f1 = new URLSearchParams()

        let query = "prefix : <https://ontologies.semanticarts.com/raw_data#>\n" +
            "prefix fl: <https://ontologies.semanticarts.com/flights/>\n" +
            "prefix owl: <http://www.w3.org/2002/07/owl#>\n" +
            "prefix skos:    <http://www.w3.org/2004/02/skos/core#>\n" +
            "#select (count(*) as ?cnt) \n" +
            "SELECT ?orgName ?orig_lat ?orig_long ?stop1Name ?stop1_lat ?stop1_long ?destName ?dest_lat ?dest_long \n" +
            "from <airline_flight_network>\n" +
            "WHERE {\n" +
            "    {\n" +
            "        ?origin a fl:Airport .\n" +
            "        ?origin fl:hasRouteTo ?dest .\n" +
            "        ?origin fl:terminalCode ?orgName .\n" +
            "        ?origin :lat ?orig_lat . \n" +
            "        ?origin :long ?orig_long . \n" +
            "        ?dest :lat ?dest_lat . \n" +
            "        ?dest :long ?dest_long . \n" +
            "        ?dest fl:terminalCode ?destName .\n" +
            "        BIND('' as ?stop1) \n" +
            `        filter(?orgName = '${origin}')\n` +
            `        filter(?destName = '${destination}') \n` +
            "    }\n" +
            "    union \n" +
            "    {\n" +
            "        ?origin a fl:Airport .\n" +
            "        ?origin fl:hasRouteTo ?stop1 .\n" +
            "        ?stop1 fl:hasRouteTo ?dest . \n" +
            "        ?origin fl:terminalCode ?orgName .\n" +
            "        ?origin :lat ?orig_lat . \n" +
            "        ?origin :long ?orig_long . \n" +
            "        ?stop1 fl:terminalCode ?stop1Name .\n" +
            "        ?stop1 :lat ?stop1_lat . \n" +
            "        ?stop1 :long ?stop1_long . \n" +
            "        ?dest :lat ?dest_lat . \n" +
            "        ?dest :long ?dest_long . \n" +
            "        ?dest fl:terminalCode ?destName .\n" +
            `        filter(?orgName = '${origin}')\n` +
            `        filter(?destName = '${destination}') \n` +
            "    }\n" +
            "  }"

        f1.append('query', query)
        f1.append('output', 'json')

        return f1;

    }

    runQueryForAllRoutes = async () => {

        const formData = await this.createDataForAllRoutes(this.state.origin,this.state.destination)
        await fetch(`http://localhost:7070/sparql`, {
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: formData
            }
        )
            .then(async (response) => {

                if (response.status === 200) {
                    let c = await response.json()

                    console.log("AA1", c.results.bindings)

                    if(c.results.bindings.length > 0) {

                        await this.setState({
                            layOver: [],
                            orgLat: parseFloat(c.results.bindings[0].orig_lat.value),
                            orgLong: parseFloat(c.results.bindings[0].orig_long.value),
                            destLat: parseFloat(c.results.bindings[0].dest_lat.value),
                            destLong: parseFloat(c.results.bindings[0].dest_long.value),
                        })

                        let dF = false
                        for (let i = 0; i < c.results.bindings.length; i++) {
                            let curr = c.results.bindings[i]
                            if (!curr.stop1Name) {
                                dF = true
                            } else {
                                await this.setState({
                                    layOver: [...this.state.layOver,
                                        {
                                            code: curr.stop1Name.value,
                                            lat: parseFloat(curr.stop1_lat.value),
                                            long: parseFloat(curr.stop1_long.value),
                                        }
                                    ]
                                })
                            }
                        }
                        await this.setState({
                            directFlight: dF,
                            query: 'all-routes'
                        })
                    } else {
                        await this.setState({
                            layOver: [],
                            orgLat: '',
                            orgLong: '',
                            destLat: '',
                            destLong: '',
                            directFlight: '',
                            query: 'all-routes'
                        })
                    }
                }
            })
    }

    //best route

    createDataForBestRoute = (origin,destination) => {
        const f1 = new URLSearchParams()

        let query = "# show shortest path from Boston (BOS) to Honolulu (HNL) using the DISTANCE RDF* edge property as a weight\n" +
            "prefix : <https://ontologies.semanticarts.com/raw_data#>\n" +
            "prefix fl: <https://ontologies.semanticarts.com/flights/>\n" +
            "prefix owl: <http://www.w3.org/2002/07/owl#>\n" +
            "prefix skos:    <http://www.w3.org/2004/02/skos/core#>\n" +
            "select * \n" +
            "from <airline_flight_network> \n" +
            "where\n" +
            "{ SERVICE <csi:shortest_path> {\n" +
            "    []\n" +
            "     <csi:binding-vertex>          ?airport ;\n" +
            "     <csi:binding-predecessor>     ?predecessor_variable_name ;\n" +
            "     <csi:binding-distance>        ?distance ;\n" +
            "     <csi:graph>                   <airline_flight_network> ;\n" +
            `     <csi:source-vertex>           <https://data.semanticarts.com/flights/_Airport_${origin}> ;\n` +
            `     <csi:destination-vertex>      <https://data.semanticarts.com/flights/_Airport_${destination}>     ;\n` +
            "     <csi:edge-label>              <https://ontologies.semanticarts.com/flights/hasRouteTo>   ;\n" +
            "     <csi:weight>                  <https://ontologies.semanticarts.com/flights/distanceMiles>    .\n" +
            " }\n" +
            "  ?airport fl:terminalCode ?destName .\n" +
            "  ?airport :lat ?dest_lat . \n" +
            "  ?airport :long ?dest_long . \n" +
            "}\n" +
            "order by (?distance)"

        f1.append('query', query)
        f1.append('output', 'json')

        return f1;

    }

    runQueryForBestRoute = async () => {

        const formData = await this.createDataForBestRoute(this.state.origin,this.state.destination)
        await fetch(`http://localhost:7070/sparql`, {
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: formData
            }
        )
            .then(async (response) => {

                if (response.status === 200) {
                    let c = await response.json()

                    console.log("Best Route", c.results.bindings)
                    console.log("Best Route length", c.results.bindings.length)

                    if(c.results.bindings.length > 0) {
                        await this.setState({
                            layOver: []
                        })
                        if (c.results.bindings.length === 3) {
                            await this.setState({
                                directFlight: false,
                                destLat: parseFloat(c.results.bindings[2].dest_lat.value),
                                destLong: parseFloat(c.results.bindings[2].dest_long.value),
                                layOver: [{
                                    code: c.results.bindings[1].destName.value,
                                    lat: parseFloat(c.results.bindings[1].dest_lat.value),
                                    long: parseFloat(c.results.bindings[1].dest_long.value),
                                }]
                            })
                        } else if (c.results.bindings.length === 2) {
                            await this.setState({
                                directFlight: true,
                                destLat: parseFloat(c.results.bindings[1].dest_lat.value),
                                destLong: parseFloat(c.results.bindings[1].dest_long.value),
                            })
                        }
                        await this.setState({
                            query: 'best-route',
                            orgLat: parseFloat(c.results.bindings[0].dest_lat.value),
                            orgLong: parseFloat(c.results.bindings[0].dest_long.value)
                        })
                    } else {
                        await this.setState({
                            layOver: [],
                            orgLat: '',
                            orgLong: '',
                            destLat: '',
                            destLong: '',
                            directFlight: '',
                            query: 'best-route'
                        })
                    }


                }
            })
    }



    render() {
        return (
            <div>

                <div className={"container-fluid bg-secondary"}>
                    <div className="row align-items-start">
                        <div className="col-sm-3 bg-dark">


                            <ul className="list-group wbdv-module-list">

                                    <span className="list-group-item bg-secondary wbdv-module-item">
                                        <Paper square>
                                            <Tabs
                                                indicatorColor="secondary.dark"
                                                textColor="primary"
                                                aria-label="disabled tabs example"
                                            >

                                             <Link to={`/dashboard`}>
                                                <Tab label="Go to Chart View">
                                                </Tab>
                                             </Link>
                                             <Link to={`/maps`}>
                                                <Tab label="Go to Map View">
                                                x   </Tab>
                                             </Link>
                                             </Tabs>
                                         </Paper>
                                    </span>

                                    <span className="list-group-item bg-info wbdv-module-item">

                                        <span className="wbdv-module-item-title text-dark">Origin</span>

                                        <Select
                                            defaultValue={this.state.airports[0]}
                                            options={this.state.airports}
                                            onChange={this.changeOrigin}
                                        />

                                        {/*<input type="text" className="input-flight"*/}
                                        {/*       onChange={async (e) =>*/}
                                        {/*           await this.setState({*/}
                                        {/*               origin: e.target.value*/}
                                        {/*           })*/}
                                        {/*       }*/}

                                        {/*       value={this.state.origin}*/}
                                        {/*/>*/}
                                    </span>

                                <span className="list-group-item bg-info wbdv-module-item">
                                        <span className="wbdv-module-item-title text-dark">Destination</span>

                                        <Select
                                            defaultValue={this.state.airports[0]}
                                            options={this.state.airports}
                                            onChange={this.changeDestination}
                                        />
                                    {/*<input type="text" className="input-flight"*/}
                                    {/*       onChange={async (e) =>*/}
                                    {/*           await this.setState({*/}
                                    {/*               destination: e.target.value*/}
                                    {/*           })*/}
                                    {/*       }*/}

                                    {/*       value={this.state.destination}*/}
                                    {/*/>*/}
                                    </span>


                                <div className="wbdv-module-item">
                                    <div className="d-flex justify-content-center">
                                        {
                                            (   this.state.origin !== 'All' &&
                                                this.state.destination !== 'All' &&
                                                this.state.origin !== this.state.destination
                                            ) &&

                                            <ButtonGroup orientation="vertical" aria-label="vertical contained primary button group" variant="contained">
                                                <Button endIcon={<Icon>send</Icon>}
                                                        onClick={async () => {
                                                            await this.runQueryForAllRoutes()
                                                            await this.setState({
                                                                curr : this.state.curr * -1
                                                            })
                                                        }
                                                        }
                                                >
                                                    SHOW ALL ROUTES
                                                </Button>
                                                <br/>
                                                <Button endIcon={<Icon>send</Icon>}
                                                        onClick={async () => {
                                                            await this.runQueryForBestRoute()
                                                            await this.setState({
                                                                curr : this.state.curr * -1
                                                            })
                                                        }
                                                        }
                                                >
                                                    SHORTEST PATH ROUTE
                                                </Button>

                                            </ButtonGroup>

                                        }
                                        {
                                            (   this.state.origin === 'All' ||
                                                this.state.destination === 'All' ||
                                                this.state.origin === this.state.destination
                                            ) &&
                                            <ButtonGroup disabled orientation="vertical" aria-label="vertical contained primary button group" variant="contained">
                                                <Button endIcon={<Icon>send</Icon>}
                                                >
                                                    SHOW ALL ROUTES
                                                </Button>
                                                <br/>
                                                <Button endIcon={<Icon>send</Icon>}
                                                >
                                                    SHORTEST PATH ROUTE
                                                </Button>

                                            </ButtonGroup>
                                        }
                                    </div>
                                </div>

                            </ul>


                        </div>
                        <div className="col-sm-9">
                           <WorldMap
                               origin={this.state.origin}
                               destination={this.state.destination}
                               orgLat={this.state.orgLat}
                               orgLong={this.state.orgLong}
                               destLat={this.state.destLat}
                               destLong={this.state.destLong}
                               directFlight={this.state.directFlight}
                               layOver={this.state.layOver}
                               query={this.state.query}
                               curr={this.state.curr}
                           />
                        </div>
                    </div>

                </div>


            </div>

        )
    }
}

export default MapView

