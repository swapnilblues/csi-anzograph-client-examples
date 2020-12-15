import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LandingComponent from "./LandingComponent";
import GoogleChartDemo from "./GoogleChartDemo";
import Dashboard from "./Dashboard/Dashboard";
import MapView from "./MapView/MapView";
import AutoComplete from "./Test/AutoComplete";






class AnzoGraphManagerComponent extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <Route
                        path="/home"
                        exact={true}
                        component={LandingComponent}
                    >
                    </Route>
                    <Route
                        path="/google-chart-demo"
                        exact={true}
                        component={GoogleChartDemo}
                    >
                    </Route>
                    <Route
                        path="/dashboard"
                        exact={true}
                        component={Dashboard}
                    >
                    </Route>
                    <Route
                        path="/maps"
                        exact={true}
                        component={MapView}
                    >
                    </Route>
                    <Route
                        path="/auto-complete"
                        exact={true}
                        component={AutoComplete}
                    >
                    </Route>
                </Router>

            </div>
        )

    }
}

export default AnzoGraphManagerComponent

