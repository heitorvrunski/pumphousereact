import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, NavbarText,Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
        <header>
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white text-primary fixed-top shadow-lg mb-3 bg-primary">
                <Container>
                    <NavbarBrand tag={Link} className="text-primary" to="/">Pump House Application</NavbarBrand>
                    <button onClick={this.toggleNavbar} aria-label="Toggle navigation" type="button" className="mr-2 btn navbar-toggler">
                      {this.state.collapsed?
                                            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 0 24 24" width="35px" fill="#ffffe7"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>                      

                      :
                      <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 0 24 24" width="35px" fill="#ffffe7"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>
                      }
                    </button>                    
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} className="text-primary" to="/counter">Charts</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-primary" to="/fetch-data">Fetch data</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
      </header>
    );
  }
}
/*

*/ 