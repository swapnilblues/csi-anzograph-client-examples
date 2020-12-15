import React from "react";
import TableOutput from "./TableOutput";
import JsonOutput from "./JsonOutput";
import XmlOutput from "./XmlOutput";
import ExplainOutput from "./ExplainOutput";
import GoogleChartTableOutput from "./GoogleChartTableOutput";
import BarChart from "./BarChart";

class ShowOutput extends React.Component {

state = {
    s : this.props.result.h[0],
    p: this.props.result.h[1],
    o : this.props.result.h[2]
}

render() {
    return (
        <div className={"row"}>
            {
                this.props.result.err !== '' &&
                <h1>{this.props.result.err}</h1>
            }

            {
                this.props.result.err === '' &&
                    this.props.output === 'json' &&
                    this.props.outfmt === 'table' &&

                    <div>
                        <TableOutput
                            result = {this.props.result}
                        />
                        {  this.props.gChart !== [] &&
                            <GoogleChartTableOutput
                                gChart={this.props.gChart}
                            />
                        }
                        {  this.props.gChart !== [] &&
                            <BarChart
                                gChart={this.props.gChart}
                            />
                        }
                    </div>
            }
            {
                this.props.result.err === '' &&
                this.props.output === 'json' &&
                this.props.outfmt === 'json' &&

                <div>
                    {console.log("JSON")}
                    <JsonOutput
                        result = {this.props.result}
                    />
                </div>
            }
            {
                this.props.result.err === '' &&
                this.props.output === 'xml' &&
                this.props.outfmt === 'xml' &&

                <div>
                    <XmlOutput
                        xmlOutput = {this.props.result.xmlOutput}
                    />
                </div>

            }
            {
                this.props.result.err === '' &&
                this.props.output === 'explain' &&
                this.props.outfmt === 'explain' &&

                <div>
                    <ExplainOutput
                        xmlOutput = {this.props.result.xmlOutput}
                    />
                </div>

            }

        </div>
    )

}
}

export default ShowOutput

