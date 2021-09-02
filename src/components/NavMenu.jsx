import React, { Component,useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, NavbarText,Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { SendMessage } from '../store/actions/index.js';

export default function NavMenu({ socket }){
  const [collapsed,SetCollapsed] = useState(true);
  const itemP = ['PressurePID','Current'];
  const itemL = ['cLevel','Percentage'];


  const pressure = useSelector(state=>state.Tags.getIn(itemP));
  const level = useSelector(state=>state.Tags.getIn(itemL));


  function toggleNavbar () {
    //state.collapsed = !state.collapsed
    SetCollapsed(!collapsed);
  }

  function IncresePressure () {
    var pressureNew = pressure +5;
    SendMessage(itemP,pressureNew,socket)

  }

  function DecresePressure () {
    var pressureNew = pressure -5;
    SendMessage(itemP,pressureNew,socket)

  }

  function IncreseLevel () {
    var levelNew = level +5;
    SendMessage(itemL,levelNew,socket)

  }

  function DecreseLevel () {
    var levelNew = level -5;
    SendMessage(itemL,levelNew,socket)

  }
  return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white text-primary fixed-top shadow-lg mb-3 bg-primary">
              <Container>
                  <NavbarBrand tag={Link} className="text-primary" to="/">Pump House Application</NavbarBrand>
                  <button onClick={toggleNavbar} aria-label="Toggle navigation" type="button" className="mr-2 btn navbar-toggler">
                    {collapsed?
                                          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 0 24 24" width="35px" fill="#ffffe7"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>                      

                    :
                    <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 0 24 24" width="35px" fill="#ffffe7"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>
                    }
                  </button>                    
                  <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                      <Nav className="mr-auto" navbar>
                      <button className="btn btn-principal mx-1" type="button" onClick={IncreseLevel}> Increase Level</button>
                          <button className="btn btn-principal mx-1 me-4" type="button" onClick={DecreseLevel}> Decrease Level</button>
                          <button className="btn btn-principal mx-1" type="button" onClick={IncresePressure}> Increase Pressure</button>
                          <button className="btn btn-principal mx-1" type="button" onClick={DecresePressure}> Decrease Pressure</button>

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
/*

*/ 
