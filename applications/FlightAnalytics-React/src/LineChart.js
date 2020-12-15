import React from "react";
import Chart from "react-google-charts";
import "react-table-6/react-table.css";

class LineChart extends React.Component {

    render() {
        return (
            <div>
                {
                    this.props.gChart && this.props.gChart[0] &&
                    <Chart
                        width={'720px'}
                        height={'465px'}
                        chartType="AreaChart"
                        loader={<div>Loading Chart</div>}
                        data={
                            this.props.gChart
                        }

                        options={{
                            backgroundColor: "#aeb1b5",
                            title: this.props.title,
                            chart: {
                                title: this.props.title
                            },
                            hAxis: {
                                minValue: 0,
                            },
                            chartArea: { width: '65%', height: '70%' }
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '2' }}
                    />
                }
            </div>

        )

    }
}

export default LineChart

