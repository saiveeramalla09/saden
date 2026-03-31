import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './Login';

const App = () => {
    const isAuthenticated = // logic to determine authentication

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route 
                    path="/other-route" 
                    render={() => (isAuthenticated ? <OtherComponent /> : <Redirect to="/" />)}
                />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default App;