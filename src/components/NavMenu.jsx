import React, { useState } from "react";
import { Collapse, Navbar, NavbarBrand, NavItem, Nav } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPartial from "./LoginPartial";

export default function NavMenu() {
  const [collapsed, SetCollapsed] = useState(true);
  const safetyNode = ["PressurePID", "Safety"];
  const groupUser = useSelector((state) => state.Auth.group);
  const safety = useSelector(
    (state) =>
      (state.Tags.loading === true ? 0 : state.Tags.getIn(safetyNode)) ?? 0
  );

  function toggleNavbar() {
    SetCollapsed(!collapsed);
  }

  function checkGroupCollapse(group) {
    if (groupUser !== group) {
      return "collapsed";
    }
    return "";
  }

  function closeExpander() {
    SetCollapsed(true);
  }
  return (
    <header>
      <Navbar className="navbar navbar-expand-lg navbar-toggleable-sm ng-white text-primary fixed-top shadow-lg mb-3 bg-primary">
        <div className="container-fluid">
          <NavbarBrand
            tag={Link}
            className="navbar-brand text-primary pt-0"
            to="/"
          >
            Pump House Application
          </NavbarBrand>
          <button
            onClick={toggleNavbar}
            aria-label="Toggle navigation"
            type="button"
            className=" btn navbar-toggler"
          >
            {collapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 0 24 24"
                width="35px"
                fill="#ffffe7"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 0 24 24"
                width="35px"
                fill="#ffffe7"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
              </svg>
            )}
          </button>
          <Collapse className="" isOpen={!collapsed} navbar>
            <Nav className="navbar-nav me-auto mb-2 mb-lg-0" navbar>
              <NavItem>
                <div
                  className={
                    safety === 1
                      ? "safetyDiv align-content-center flex-wrap text-center mx-2 "
                      : "collapsed"
                  }
                >
                  {" "}
                  <h5>Safety Mode ON</h5>
                </div>
              </NavItem>
              <NavItem>
                <NavLink
                  exact={true}
                  className="text-primary text-Link me-2 is-not-active "
                  activeClassName="active"
                  to="/"
                  onClick={closeExpander}
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="text-primary text-Link me-2 is-not-active "
                  activeClassName="active"
                  to="/Trend"
                  onClick={closeExpander}
                >
                  Trend
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={
                    "text-primary text-Link me-2  is-not-active " +
                    checkGroupCollapse("admin")
                  }
                  activeClassName="active"
                  to="/Settings"
                  onClick={closeExpander}
                >
                  Settings
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={
                    "text-primary text-Link me-2 is-not-active " +
                    checkGroupCollapse("admin")
                  }
                  activeClassName="active"
                  to="/UsersConfig"
                  onClick={closeExpander}
                >
                  System
                </NavLink>
              </NavItem>
            </Nav>
            <LoginPartial onClick={closeExpander} />
          </Collapse>
        </div>
      </Navbar>
    </header>
  );
}
/*

                          <button className="btn btn-principal mx-1 mt-1" type="button" onClick={IncreseLevel}> Increase Level</button>
                          <button className="btn btn-principal mx-1 mt-1 text-nowrap me-4 " type="button" onClick={DecreseLevel}> Decrease Level</button>
                          <button className="btn btn-principal mx-1 mt-1 text-nowrap " type="button" onClick={IncresePressure}> Increase Pressure</button>
                          <button className="btn btn-principal mx-1 mt-1 text-nowrap " type="button" onClick={DecresePressure}> Decrease Pressure</button>

*/
