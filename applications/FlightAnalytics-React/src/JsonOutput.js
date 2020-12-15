import React from "react";

class JsonOutput extends React.Component {


    render() {
    return (
        <div>
            {  this.props.result.value !== undefined &&
            <div className={"border border-info"}>
                            <pre>
                            {
                                JSON.stringify(this.props.result.value, null , 2)
                            }
                            </pre>
            </div>
            }
        </div>
            )
}
}

export default JsonOutput

