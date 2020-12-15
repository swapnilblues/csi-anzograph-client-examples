import React from "react";
import { Chart } from "react-google-charts";


class GoogleChartDemo extends React.Component {

    state = {
        arr : [
            ["name", "weight"],
            ["a", 12],
            ["b", 5.5],
            ["c", 14],
            ["d", 5],
            ["e", 3.5]
        ],
        load : []
    }
    abcd = [
        ["leg", "dist"],
        ["a", 121],
        ["b", 787],
        ["c", 872],
        ["d", 432],
        ["e", 655]
    ]


    render() {
        return (
            <div className={"my-pretty-chart-container"}>
                {/*<Chart*/}
                {/*    width={'500px'}*/}
                {/*    height={'300px'}*/}
                {/*    chartType="Table"*/}
                {/*    loader={<div>Loading Chart</div>}*/}
                {/*    data= {this.state.arr}*/}
                {/*    options={{*/}
                {/*        showRowNumber: true,*/}
                {/*    }}*/}
                {/*    rootProps={{ 'data-testid': '1' }}*/}
                {/*/>*/}

                {/*<Chart*/}
                {/*    width={'500px'}*/}
                {/*    height={'300px'}*/}
                {/*    chartType="GeoChart"*/}
                {/*    data={[*/}
                {/*        ['City', 'Population', 'Area'],*/}
                {/*        ['Boston', 2761477, 1285.31],*/}
                {/*        ['Chicago', 1324110, 181.76],*/}
                {/*        ['Dallas', 959574, 117.27],*/}
                {/*    ]}*/}
                {/*    options={{*/}
                {/*        region: 'IT',*/}
                {/*        displayMode: 'markers',*/}
                {/*        colorAxis: { colors: ['green', 'blue'] },*/}
                {/*    }}*/}
                {/*    // Note: you will need to get a mapsApiKey for your project.*/}
                {/*    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings*/}
                {/*    mapsApiKey="AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"*/}
                {/*    rootProps={{ 'data-testid': '2' }}*/}
                {/*/>*/}

                {/*bar-chart*/}
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={
                        this.abcd
                    }
                    options={{
                        title: 'Population of Largest U.S. Cities',
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: 'Total Population',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'City',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                />

                {/*area-chart*/}
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Year', 'Sales', 'Expenses'],
                        ['2013', 1000, 400],
                        ['2014', 1170, 460],
                        ['2015', 660, 1120],
                        ['2016', 1030, 540],
                    ]}
                    options={{
                        title: 'Company Performance',
                        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                        vAxis: { minValue: 0 },
                        // For the legend to fit, we make the chart area smaller
                        chartArea: { width: '50%', height: '70%' },
                        // lineWidth: 25
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                />

                {/*bubble chart*/}
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="BubbleChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population'],
                        ['CAN', 80.66, 1.67, 'North America', 33739900],
                        ['DEU', 79.84, 1.36, 'Europe', 81902307],
                        ['DNK', 78.6, 1.84, 'Europe', 5523095],
                        ['EGY', 72.73, 2.78, 'Middle East', 79716203],
                        ['GBR', 80.05, 2, 'Europe', 61801570],
                        ['IRN', 72.49, 1.7, 'Middle East', 73137148],
                        ['IRQ', 68.09, 4.77, 'Middle East', 31090763],
                        ['ISR', 81.55, 2.96, 'Middle East', 7485600],
                        ['RUS', 68.6, 1.54, 'Europe', 141850000],
                        ['USA', 78.09, 2.05, 'North America', 307007000],
                    ]}
                    options={{
                        title:
                            'Correlation between life expectancy, fertility rate ' +
                            'and population of some world countries (2010)',
                        hAxis: { title: 'Life Expectancy' },
                        vAxis: { title: 'Fertility Rate' },
                        bubble: { textStyle: { fontSize: 11 } },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />

                {/*calender chart*/}
                <Chart
                    width={1000}
                    height={350}
                    chartType="Calendar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
                        [new Date(2012, 3, 13), 37032],
                        [new Date(2012, 3, 14), 38024],
                        [new Date(2012, 3, 15), 38024],
                        [new Date(2012, 3, 16), 38108],
                        [new Date(2012, 3, 17), 38229],
                        [new Date(2013, 1, 4), 38177],
                        [new Date(2013, 1, 5), 38705],
                        [new Date(2013, 1, 12), 38210],
                        [new Date(2013, 1, 13), 38029],
                        [new Date(2013, 1, 19), 38823],
                        [new Date(2013, 1, 23), 38345],
                        [new Date(2013, 1, 24), 38436],
                        [new Date(2013, 2, 10), 38447],
                    ]}
                    options={{
                        title: 'Red Sox Attendance',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />

                {/*pie-chart*/}
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Task', 'Hours per Day'],
                        ['Work', 11],
                        ['Eat', 2],
                        ['Commute', 2],
                        ['Watch TV', 2],
                        ['Sleep', 7],
                    ]}
                    options={{
                        title: 'My Daily Activities',
                        is3D: true
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />

                {/*trend-lines*/}
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="ScatterChart"
                    loader={<div>Loading Chart</div>}
                    data={[['Generation', 'Descendants'], [0, 1], [1, 33], [2, 269], [3, 2013]]}
                    options={{
                        title: 'Descendants by Generation',
                        hAxis: { title: 'Generation', minValue: 0, maxValue: 3 },
                        vAxis: { title: 'Descendants', minValue: 0, maxValue: 2100 },
                        trendlines: {
                            0: {
                                type: 'exponential',
                                visibleInLegend: true,
                            },
                        },
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />


            </div>
        )
    }
}

export default GoogleChartDemo

