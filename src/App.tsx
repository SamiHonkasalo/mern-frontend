import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Users from './user/pages/Users';

const App: React.FC = () => {
    return (
        <Router>
            <Route path="/users" exact>
                <Users />
            </Route>
        </Router>
    );
};

export default App;
