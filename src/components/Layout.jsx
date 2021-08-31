import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import Home from './Home';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
            <NavMenu />
            <div className="container-fluid" style={{marginTop:"60px"}}>
              <Home/>
            </div>
      </div>
    );
  }
}
