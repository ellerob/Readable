import React, { Component } from 'react';
import { fetchCategories } from '../utils/api'
// import './App.css';

class App extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    fetchCategories().then((categories) => {
      this.setState({ categories })
    })
  }


  render() {
    const { categories } = this.state
    return (
      <div>
       {categories.map((category, index) => (
         <a key={index}>
          {category.name}
         </a>
        ))}
      </div>
    );
  }
}

export default App;
