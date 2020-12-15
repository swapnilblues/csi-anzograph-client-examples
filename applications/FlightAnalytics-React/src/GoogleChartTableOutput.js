import React from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

class GoogleChartTableOutput extends React.Component {

// state = {
//     header : []
// }
// componentDidMount() {
//     this.setState([
//         this.state.header : this.
//     ])
//
 state = {
     data: [],
     header: []
 }

  loadData = async () => {
     await this.setState({
         data : []
     })
     if (this.props.gChart) {
         for(let i = 1; i < this.props.gChart.length; i++) {
             let curr = this.props.gChart[i]
             if(curr) {
                 // console.log("Individual",this.props.gChart[i])
                 await this.setState({
                     data : [...this.state.data,
                         {  s: curr[0] ,
                            p: curr[1],
                            o: curr[2]
                         }
                     ]
                 })
             }
         }
         // console.log("SWA",this.props.gChart)
     }
     // console.log("AA", this.state.data)
  }

  componentDidMount() {
     this.loadData()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
     if(prevProps.gChart !== this.props.gChart) {
         this.loadData()
     }

  }

    render() {
return (
    <div>
        {
            this.props.gChart[0] &&

            <ReactTable
                // data={this.props.gChart[1]}
                data = {this.state.data}
                columns={[
                    {
                        Header: "CSI",
                        columns: [
                            {
                                Header: this.props.gChart[0][0],
                                accessor: "s",
                                width: 200
                            },
                            {
                                Header: this.props.gChart[0][1],
                                accessor: "p",
                                width: 200,
                                className: "frozen",
                                headerClassName: "frozen"
                            },
                            {
                                Header: this.props.gChart[0][2],
                                accessor: "o",
                                width: 200,
                                className: "frozen",
                                headerClassName: "frozen"
                            }
                        ],
                    }
                ]}
            />
        }
    </div>

    )

    }
}

export default GoogleChartTableOutput

