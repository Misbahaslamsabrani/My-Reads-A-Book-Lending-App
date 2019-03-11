import React, {Component} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Search from './Components/Search';
import BookShelf from './Components/BookShelf';

class BooksApp extends Component{
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

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

