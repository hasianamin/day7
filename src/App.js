import React, { Component } from 'react';
import './App.css';
import Home from './Pages/Home'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import Header from './components/Header'
import Product from './Pages/Product'
import Topics from './Pages/Topics'
import Pages404 from './Pages/Pages404'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/product'>
              <Product/>
            </Route>
            <Route exact path='/topics'>
              <Topics/>
            </Route>
            <Route path='*'>
              <Pages404/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
