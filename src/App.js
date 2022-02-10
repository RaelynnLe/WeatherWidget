import React from 'react';
import {history} from './historyVar';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import ForecastPage from "./pages/ForecastPage";
import SearchPage from "./pages/SearchPage";


const App = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/SimpleWeather'>
                    <div className='container'>
                        <SearchPage/>
                        <ForecastPage/>
                    </div>
                </Route>
                <Redirect to='/SimpleWeather'/>
            </Switch>
        </Router>
    );
};
export default App;
