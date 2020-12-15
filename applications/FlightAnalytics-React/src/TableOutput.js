import React from "react";

class TableOutput extends React.Component {

componentDidMount() {
    console.log("Table output result",this.props.result)
}

    render() {
    return (
        <table className="table border border-info">
            <thead>
            <tr>
                {
                    this.props.result.h && this.props.result.h.map( (hEle) =>
                        <th>
                            {hEle}
                        </th>
                    )
                }

            </tr>
            </thead>
            <tbody>
            { this.props.result.v && this.props.result.v.map( (vEle) =>
                <tr>
                    {
                        this.props.result.h && this.props.result.h.map( (hEle) =>

                            <td>
                                {vEle[hEle].type === 'uri' &&
                                <div>
                                    <pre>
                                        {'<' + vEle[hEle].value + '>'}
                                    </pre>

                                </div>
                                }
                                {vEle[hEle].type !== 'uri' && vEle[hEle].datatype.substring(33) === 'string' &&
                                <div>
                                    "{vEle[hEle].value}"
                                </div>

                                }
                                {vEle[hEle].type !== 'uri' && ( vEle[hEle].datatype.substring(33) === 'int'
                                    || vEle[hEle].datatype.substring(33) === 'long'
                                    || vEle[hEle].datatype.substring(33) === 'double'
                                )  &&
                                <div>
                                    {vEle[hEle].value}
                                </div>

                                }
                                <td>

                                </td>
                            </td>


                        )
                    }
                </tr>
            )
            }

            </tbody>
        </table>
    )

}
}

export default TableOutput

