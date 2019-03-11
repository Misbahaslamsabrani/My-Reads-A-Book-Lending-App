import React, {Component} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Search from './Components/Search';
import BookShelf from './Components/BookShelf';

class BooksApp extends Component{
  render() {
    return (
      <div className="app">
      <Router>
          <Switch>
            <Route exact path="/" component={BookShelf}/>
            <Route exact path="/Search" component={Search}/>
          </Switch>
      </Router>
      </div>
    )
  }
}
export default BooksApp

