import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import DocumentTable from './components/DocumentTable'
import DocumentForm from './components/DocumentForm'
import DocumentView from './components/DocumentView';

function Router() {
    return (
        <BrowserRouter>
        <div className="mx-4">
            <Switch>
                <Route exact path="/">
                    <DocumentTable />
                </Route>
                <Route exact path="/form">
                    <DocumentForm />
                </Route>
                <Route exact path="/view/:id">
                    <DocumentView />
                </Route>
            </Switch>
        </div>
        </BrowserRouter>
    );
}

export default Router;

if (document.getElementById('root')) {
    ReactDOM.render(<Router />, document.getElementById('root'));
}
