import React from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

class ReactTableComponent extends React.Component {

    render() {
        return (
            <div>
                {
                    this.props.gChart && this.props.gChart[0] &&
                    <ReactTableComponent
                        data = {this.props.gChart}
                    />
                }
            </div>

        )

    }
}

export default ReactTableComponent

