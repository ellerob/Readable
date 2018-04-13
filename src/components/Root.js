import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App';
import CategoryPage from './CategoryPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/action" component={CategoryPage} />
        <Route path="/comedy" component={CategoryPage} />
        <Route path="/drama" component={CategoryPage} />
        <Route path="/horror" component={CategoryPage} />
        <Route path="/sci-fi" component={CategoryPage} />
      </Switch>
    </Router>
  </Provider>
)

export default Root