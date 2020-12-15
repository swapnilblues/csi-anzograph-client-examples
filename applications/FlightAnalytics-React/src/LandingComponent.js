import React from "react";
import ShowOutput from "./ShowOutput";
import {AZG_API} from "./common/config";


class LandingComponent extends React.Component {

state = {

    query: '# Insert SPARQL Query here, and click [Run] button \n',
    outfmt: '',
    output: '',
    result: {status: '', value: {heads: {vars: []}, results: {bindings: []}}, h: [], v: [], err: '', xmlOutput: ''},
    dguri: '',
    nguri: '',
    graphDBs: [],
    gChart: [],
    titleOfGraph: ''
}

componentDidMount() {
    this.getGraphsFromDB()
}





getGraphsFromDB = () => {
    const formData1 = new URLSearchParams()
    formData1.append('query','select ?g {graph?g{}}')
    fetch(AZG_API, {
        method: "POST",
        headers: {
            // 'Authorization': 'Basic dGVzdDp0ZXN0',
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: formData1
     })
        .then(r => {
            return r.text()
            }
        ).then( async (c) => {
            let parser = new DOMParser()
            let xmlDoc = parser.parseFromString(c, 'text/xml')
            let graphs = xmlDoc.getElementsByTagName('uri')

            // console.log(graphs[0].innerHTML)

            await this.setState({
                graphDBs : []
            })

            for(let i=0; i < graphs.length; i++) {
                let graph = graphs[i].innerHTML
                this.setState({
                    graphDBs : [...this.state.graphDBs, graph ]
                })
            }
    })
}

createData = () => {
    const f1 = new URLSearchParams()
    f1.append('query', this.state.query)
    f1.append('outfmt', this.state.outfmt)
    f1.append('output', this.state.output)
    this.state.dguri !== '' &&
    f1.append('default-graph-uri', this.state.dguri)
    this.state.nguri !== '' &&
    f1.append('named-graph-uri', this.state.nguri)

    return f1
}

creatGChart = (h,v) => {
    let data = []
    data.push(h)

    // eslint-disable-next-line
     v && v.map( (vEle) =>
            {   let currRow = []
                // eslint-disable-next-line
                h && h.map( (hEle) =>
                {
                    // console.log("Values", vEle[hEle])
                    if (vEle[hEle].type === 'uri') {
                        currRow.push('<' + vEle[hEle].value + '>')
                    } else if(vEle[hEle].type !== 'uri' && vEle[hEle].datatype.substring(33) === 'string') {
                        currRow.push("\"" + vEle[hEle].value + "\"")
                    } else if(vEle[hEle].type !== 'uri' && vEle[hEle].datatype.substring(33) === 'int') {
                        currRow.push(vEle[hEle].value)
                    }
                })
                // console.log("Curr Row",currRow)
                data.push(currRow)
            })

    // console.log("Data",data)

    return data
}


runQuery = async () => {

    const formData = await this.createData()
    await fetch(AZG_API, {
            method: "POST",
            headers: {
                // 'Authorization': 'Basic dGVzdDp0ZXN0',
              'content-type': 'application/x-www-form-urlencoded'
             },
            body: formData
        }
        )
    .then(async (response) => {


        if (response.status === 200) {
             if (this.state.output === 'json') {
                 let c = await response.json()
                 console.log("AA",c)
                 await this.setState({
                     result: {
                         status: 200,
                         err: '',
                         value: c,
                         h: c.head.vars,
                         v: c.results.bindings
                     }
                 })
                 let d1 = await this.creatGChart(c.head.vars,c.results.bindings)
                 // console.log("d1",d1)
                 await this.setState({
                     gChart : d1
                 })

                 // console.log("gChart after setState",this.state.gChart)
             }

            else if (this.state.output === 'xml') {
                 this.setState({
                     result: {
                         status: 200,
                         err: '',
                         xmlOutput: await response.text()
                     },
                 })
             }

             else if (this.state.output === 'explain') {
                 this.setState({
                     result: {
                         status: 200,
                         err: '',
                         xmlOutput: await response.text()
                     },
                 })
             }

             else  {
                 this.setState({
                     result: await response
                 })
             }


        } else {
               this.setState({
                result: {
                    status: 400,
                    err: await response.text(),
                    value: [],
                    h : [],
                    v : []
                }
            })
        }

      console.log("LC",this.state.result)
      console.log("XML",this.state.xmlOutput)
      return this.state.result
    }
    ).then(() => console.log("GChart 1 ",this.state.gChart))
}

render() {
    return (
        <div className={"container-fluid"}>
            <div>AnzoGraph Run Query</div>
            <br/>
                <div className={"row"}>
                    <div className={"col-sm-3"}>Default Graph:
                        <input
                            type="text" title="CSV of Default Graphs" className="inputgraph"
                            id="defaultgraph" size="25"
                                  onChange={async (e) =>
                                      await this.setState({
                                          dguri: e.target.value
                                      })
                                  }

                                  value={this.state.dguri}
                        />
                    </div>
                    <div  className={"col-sm-2"}>

                                <select className="inputgraph" title="List of Named Graphs" id="selectgraph"

                                        onChange={ async (e) => {
                                            let newOutput = e.target.value
                                            await this.setState(prevState => ({
                                                dguri: newOutput

                                            }))

                                        }}

                                >
                                    <option
                                        value=""
                                    >[DEFAULT]</option>
                                    {
                                        this.state.graphDBs && this.state.graphDBs.map( graphDB =>
                                            <option
                                                value = {graphDB}
                                            >{graphDB}</option>
                                        )
                                    }
                                </select>
                                <button className="querytext" title="Refresh Graphs"
                                        onClick={this.getGraphsFromDB}>&#x21bb;</button>
                    </div>
                </div>
            <br/>
                <div className={"row"}>
                    <div>
                        <div className={"col-sm-12"}>Named Graph:
                            <input
                                type="text" title="CSV of Named Graphs" className="inputgraph"
                                id="namedgraph" size="25"
                                onChange={async (e) =>
                                    await this.setState({
                                        nguri: e.target.value
                                    })
                                }

                                value= {this.state.nguri}
                            />
                        </div>
                    </div>
                </div>
            <br/>


                <div class="inputgraphgrid">

                        <div className="form-group">
                         <textarea className="querytext" id="querytext" rows="11" cols="80"
                             onChange={async (e) =>
                                 await this.setState({
                                 query: e.target.value
                                     })
                               }

                           value={this.state.query}
                         >
                          </textarea>
                        </div>
                    <div>
                        <button>&#x2190;</button>
                        <button>&#x2192;</button>
                        <select
                                onChange={ async (e) => {
                                    let newOutput = e.target.value
                                    await this.setState(prevState => ({
                                        outfmt: newOutput

                                    }))
                                    if (this.state.outfmt === 'xml') {
                                        this.setState({
                                            output: 'xml'
                                        })
                                    }
                                    else if (this.state.outfmt === 'explain') {
                                        this.setState({
                                            output: 'explain'
                                        })
                                    }
                                    else {
                                        this.setState({
                                            output: 'json'
                                        })
                                    }

                                }}
                                value={this.state.outfmt}>

                            <option value=''>[Select an output layout option]</option>
                            <option value="table">Table</option>
                            <option value="json">JSON</option>
                            <option value="xml">XML</option>
                            <option value="dataframe">dfjs.DataFrame</option>
                            <option value="explain">Explain</option>

                        </select>

                        &nbsp;
                        <button className="fab fa-google-play"

                                onClick={this.runQuery}
                        />
                    </div>
                </div>
            <br/>

                <div className={"container-fluid"}>
                    <ShowOutput
                        className="container-fluid"
                        outfmt={this.state.outfmt}
                        output={this.state.output}
                        result={this.state.result}
                        gChart = {this.state.gChart}
                    />
                </div>
        </div>
    )

}
}

export default LandingComponent

