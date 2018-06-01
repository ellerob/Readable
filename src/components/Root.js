import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App';
import CategoryPage from './CategoryPage';
import PostPage from './PostPage';
import AddPostPage from './AddPostPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/category/:id" component={CategoryPage} />
        <Route path="/posts/:id" component={PostPage} />
        <Route path="/add-post" component={AddPostPage} />
      </Switch>
    </Router>
  </Provider>
)

export default Root