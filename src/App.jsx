import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Provider } from 'react-redux';
import store from './store'
//import './custom.css'
import './custom.scss';




export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Provider store={store}>
        <Layout>
          
        </Layout>
      </Provider>
      
    );
  }
}
/*<Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />*/


/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
