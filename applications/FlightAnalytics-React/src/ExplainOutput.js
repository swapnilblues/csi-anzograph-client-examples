import React from "react";

class ExplainOutput extends React.Component {


    render() {
        return (
            <div>
                {  this.props.xmlOutput !== undefined  &&
                <div className={"border border-info"}>
                            <pre>
                            {
                                this.props.xmlOutput
                            }
                            </pre>
                </div>
                }
            </div>

        )

    }
}

export default ExplainOutput

