import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App';
import CategoryPage from './CategoryPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/category/:id" component={CategoryPage} />
      </Switch>
    </Router>
  </Provider>
)

export default Root