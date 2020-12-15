import React from "react";
import Chart from "react-google-charts";
import "react-table-6/react-table.css";

class PieChart extends React.Component {

    render() {
return (
    <div>
        {
            this.props.gChart && this.props.gChart[0] &&
            <Chart
                width={'500px'}
                height={'470px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={
                    this.props.gChart
                }
                options={{
                    backgroundColor: "#aeb1b5",
                    title: this.props.title,
                    // Just add this option
                    is3D: true,
                    chartArea: { width: '90%', height: '80%' }
                }}
            />

        }
    </div>

    )

    }
}

export default PieChart

