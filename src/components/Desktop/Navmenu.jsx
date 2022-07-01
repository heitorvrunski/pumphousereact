import React from "react";
import { NavItem } from "reactstrap";
import {  NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckGroup from "../../utils/CheckGroup";
import LoginPartial from "./PartialLogin";
import "./NavMenu.scss";

import { createTheme,ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CFD8DC',
    },
    secondary: {
      main: '#ba2d3d',
    },
  },
});

export default function NavMenu() {
  const groupUser = useSelector((state) => state.Auth.group);
  const totalAlarms = useSelector(
    (state) =>
      (state.Tags.loading === true ? 0 : state.Tags.get("TotalAlarmsActive")) ?? 0
  );
  

  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0  ms-0 text-secundary  shadow-sm  bg-secundary" style={{"maxWidth":"250px"}}>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline text-primary pt-0 f-400">Pump House System</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100" id="menu">
              <NavItem className="mt-4 w-100">
                <NavLink
                  exact={true}
                  className={
                    "d-block text-Link me-3  f-400 is-not-active p-2 w-100 " +
                    (CheckGroup.checkIfHasnoGroup(groupUser)===true?"collapsed":"")

                  }
                  activeClassName="active nav-border rounded-3"
                  to="/Control"
                >
                  <svg width="25px" data-name="Layer 1" className="me-2 ms-1 active-SVG" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 80.97 106.54"><defs></defs><path className="cls-1" d="M30.17,34.64V7.58H6.93V63.85h.2A35.78,35.78,0,0,1,30.17,34.64Z"/><rect className="cls-1" x="0.04" y="0.07" width="38.42" height="5.91"/><path className="cls-1" d="M44.73,34.11a36.19,36.19,0,1,0,36.2,36.18A36.19,36.19,0,0,0,44.73,34.11Zm8.72,14.31a23.83,23.83,0,0,1,8.35,5.51c.27.27.53.54.78.82a24,24,0,0,1-2.76,8.31l-.24.24a16.76,16.76,0,0,0-3-4.14A16,16,0,0,0,53.89,57c-.13-2.9.12-5.71-.45-8.52Zm4.21,21.89a13,13,0,1,1-13-13A13,13,0,0,1,57.66,70.31ZM35.25,48.68A24.05,24.05,0,0,1,45,46.61q.57,0,1.14,0a24.08,24.08,0,0,1,4,7.8v.34a16.77,16.77,0,0,0-8.51-.42c-2.16-1.94-4-4.09-6.39-5.66Zm-7.06,4.59.82-.78a24.14,24.14,0,0,1,8.33,2.72l.24.24a16.55,16.55,0,0,0-4.13,3,17.06,17.06,0,0,0-2.2,2.71c-2.89.15-5.7-.09-8.51.5h0A23.92,23.92,0,0,1,28.19,53.27ZM23,79.69A23.88,23.88,0,0,1,21,69.9q0-.57,0-1.14a24.21,24.21,0,0,1,7.81-4h.34a16.68,16.68,0,0,0-.43,8.52c-1.95,2.15-4.1,4-5.67,6.37ZM36,92.24a24,24,0,0,1-8.38-5.48l-.78-.82a24.25,24.25,0,0,1,2.73-8.32l.24-.24a16.8,16.8,0,0,0,3,4.13,16.46,16.46,0,0,0,2.7,2.2c.15,2.89-.1,5.71.49,8.52ZM54,92a23.76,23.76,0,0,1-9.8,2c-.38,0-.76,0-1.13,0a24,24,0,0,1-3.95-7.82v-.34a16.23,16.23,0,0,0,5,.8,15.9,15.9,0,0,0,3.47-.35c2.14,2,4,4.11,6.36,5.69Zm7.08-4.56c-.27.27-.55.53-.83.78A24.09,24.09,0,0,1,52,85.44l-.24-.24a16.76,16.76,0,0,0,4.14-3,17.52,17.52,0,0,0,2.21-2.7c2.89-.14,5.7.11,8.51-.48v0A23.81,23.81,0,0,1,61.09,87.41ZM68.34,72a24.34,24.34,0,0,1-7.83,3.93h-.34a16.77,16.77,0,0,0,.47-8.51c2-2.15,4.11-4,5.69-6.36h0a24,24,0,0,1,2,9.81C68.37,71.2,68.36,71.58,68.34,72Z"/></svg>

                  Control
                </NavLink>
              </NavItem>
              <NavItem className=" w-100">
                <NavLink
                  className={
                    " d-block text-Link me-3  f-400 is-not-active  p-2 w-100 " +
                    (CheckGroup.checkIfHasnoGroup(groupUser)===true?"collapsed":"")
                  }
                  activeClassName="active nav-border rounded-3"
                  to="/Trend"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="me-2 active-SVG" width="30px" fill="currentColor" viewBox="0 0 48 48"><path d="M43.85 46 37.15 39.3Q36.1 40.05 34.875 40.45Q33.65 40.85 32.35 40.85Q28.8 40.85 26.325 38.375Q23.85 35.9 23.85 32.35Q23.85 28.8 26.325 26.325Q28.8 23.85 32.35 23.85Q35.9 23.85 38.375 26.325Q40.85 28.8 40.85 32.35Q40.85 33.65 40.425 34.875Q40 36.1 39.3 37.2L46 43.85ZM32.35 37.85Q34.65 37.85 36.25 36.25Q37.85 34.65 37.85 32.35Q37.85 30.05 36.25 28.45Q34.65 26.85 32.35 26.85Q30.05 26.85 28.45 28.45Q26.85 30.05 26.85 32.35Q26.85 34.65 28.45 36.25Q30.05 37.85 32.35 37.85ZM4.45 35.55 2 33.75 11.4 18.75 17.4 25.75 25.35 12.85 30.8 20.95Q30 21.05 29.25 21.275Q28.5 21.5 27.75 21.8L25.5 18.35L17.85 30.8L11.8 23.75ZM36.05 21.45Q35.3 21.15 34.5 21.05Q33.7 20.95 32.85 20.85L43.55 4L46 5.8Z"/></svg>
                  Trend
                </NavLink>
              </NavItem >
              <li className={
                    " nav-item w-100 " +
                    (CheckGroup.checkIfHasnoGroup(groupUser)===true?"collapsed":"")
                  }>
                <ThemeProvider theme={theme}>
                      <NavLink
                        className={
                          " d-block f-400 text-Link is-not-active p-2  w-100 position-relative "
                        }
                        activeClassName="active nav-border rounded-3"
                        to="/Alarms"
                      >
                                          {/* <Badge badgeContent={totalAlarms}   color="secondary" style={{verticalAlign:"unset ","width":"auto"}}> */}

                        <svg xmlns="http://www.w3.org/2000/svg" className="me-2 active-SVG" width="30px" fill="currentColor" viewBox="0 0 48 48"><path d="M24.05 24.45ZM2 42 24 4 46 42ZM22.7 30.6H25.7V19.4H22.7ZM24.2 36.15Q24.85 36.15 25.275 35.725Q25.7 35.3 25.7 34.65Q25.7 34 25.275 33.575Q24.85 33.15 24.2 33.15Q23.55 33.15 23.125 33.575Q22.7 34 22.7 34.65Q22.7 35.3 23.125 35.725Q23.55 36.15 24.2 36.15ZM7.2 39H40.8L24 10Z"/></svg>
                        Alarms
                        {
                            totalAlarms>0?
                            <span className="badge badge-alarm rounded-pill me-2 position-absolute end-0 mt-1" >{totalAlarms}</span>
                            :
                            null
                        }

                        {/* </Badge> */}

                      </NavLink>
                </ThemeProvider>
                
              </li>
              
              
              <NavItem className=" w-100">
                <NavLink
                  className={
                    " d-block text-Link me-3  f-400  is-not-active p-2 w-100 " +
                    (CheckGroup.checkGroup("admin",groupUser)===true?"":"collapsed")
                  }
                  activeClassName="active nav-border rounded-3"
                  to="/Settings"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="me-2 active-SVG" width="30px" fill="currentColor" viewBox="0 0 48 48"><path d="M19.4 44 18.4 37.7Q17.45 37.35 16.4 36.75Q15.35 36.15 14.55 35.5L8.65 38.2L4 30L9.4 26.05Q9.3 25.6 9.275 25.025Q9.25 24.45 9.25 24Q9.25 23.55 9.275 22.975Q9.3 22.4 9.4 21.95L4 18L8.65 9.8L14.55 12.5Q15.35 11.85 16.4 11.25Q17.45 10.65 18.4 10.35L19.4 4H28.6L29.6 10.3Q30.55 10.65 31.625 11.225Q32.7 11.8 33.45 12.5L39.35 9.8L44 18L38.6 21.85Q38.7 22.35 38.725 22.925Q38.75 23.5 38.75 24Q38.75 24.5 38.725 25.05Q38.7 25.6 38.6 26.1L44 30L39.35 38.2L33.45 35.5Q32.65 36.15 31.625 36.775Q30.6 37.4 29.6 37.7L28.6 44ZM24 30.5Q26.7 30.5 28.6 28.6Q30.5 26.7 30.5 24Q30.5 21.3 28.6 19.4Q26.7 17.5 24 17.5Q21.3 17.5 19.4 19.4Q17.5 21.3 17.5 24Q17.5 26.7 19.4 28.6Q21.3 30.5 24 30.5ZM24 27.5Q22.55 27.5 21.525 26.475Q20.5 25.45 20.5 24Q20.5 22.55 21.525 21.525Q22.55 20.5 24 20.5Q25.45 20.5 26.475 21.525Q27.5 22.55 27.5 24Q27.5 25.45 26.475 26.475Q25.45 27.5 24 27.5ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM21.8 41H26.2L26.9 35.4Q28.55 35 30.025 34.15Q31.5 33.3 32.7 32.1L38 34.4L40 30.8L35.3 27.35Q35.5 26.5 35.625 25.675Q35.75 24.85 35.75 24Q35.75 23.15 35.65 22.325Q35.55 21.5 35.3 20.65L40 17.2L38 13.6L32.7 15.9Q31.55 14.6 30.1 13.725Q28.65 12.85 26.9 12.6L26.2 7H21.8L21.1 12.6Q19.4 12.95 17.925 13.8Q16.45 14.65 15.3 15.9L10 13.6L8 17.2L12.7 20.65Q12.5 21.5 12.375 22.325Q12.25 23.15 12.25 24Q12.25 24.85 12.375 25.675Q12.5 26.5 12.7 27.35L8 30.8L10 34.4L15.3 32.1Q16.5 33.3 17.975 34.15Q19.45 35 21.1 35.4Z"/></svg>
                  Settings
                </NavLink>
              </NavItem>
              <NavItem className="w-100">
                <NavLink
                  className={
                    " d-block text-Link   f-400 is-not-active p-2 w-100 " +
                    (CheckGroup.checkGroup("admin",groupUser)===true?"":"collapsed")
                  }
                  activeClassName="active nav-border rounded-3"
                  to="/watch"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="me-2 active-SVG" width="30px" fill="currentColor" viewBox="0 0 48 48"><path d="M24 31.5Q27.55 31.5 30.025 29.025Q32.5 26.55 32.5 23Q32.5 19.45 30.025 16.975Q27.55 14.5 24 14.5Q20.45 14.5 17.975 16.975Q15.5 19.45 15.5 23Q15.5 26.55 17.975 29.025Q20.45 31.5 24 31.5ZM24 28.6Q21.65 28.6 20.025 26.975Q18.4 25.35 18.4 23Q18.4 20.65 20.025 19.025Q21.65 17.4 24 17.4Q26.35 17.4 27.975 19.025Q29.6 20.65 29.6 23Q29.6 25.35 27.975 26.975Q26.35 28.6 24 28.6ZM24 38Q16.7 38 10.8 33.85Q4.9 29.7 2 23Q4.9 16.3 10.8 12.15Q16.7 8 24 8Q31.3 8 37.2 12.15Q43.1 16.3 46 23Q43.1 29.7 37.2 33.85Q31.3 38 24 38ZM24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23ZM24 35Q30.05 35 35.125 31.725Q40.2 28.45 42.85 23Q40.2 17.55 35.125 14.275Q30.05 11 24 11Q17.95 11 12.875 14.275Q7.8 17.55 5.1 23Q7.8 28.45 12.875 31.725Q17.95 35 24 35Z"/></svg>
                  Windows Watch
                </NavLink>
              </NavItem>
              <NavItem className="w-100">
                <NavLink
                  className={
                    " d-block text-Link me-3  f-400 is-not-active p-2 w-100 " +
                    (CheckGroup.checkGroup("admin",groupUser)===true?"":"collapsed")
                  }
                  activeClassName="active nav-border rounded-3"
                  to="/system"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="me-2 active-SVG" width="30px" fill="currentColor" viewBox="0 0 48 48"><path d="M35.25 41.6 22.35 28.6Q21.2 29 20.05 29.25Q18.9 29.5 17.7 29.5Q12.85 29.5 9.45 26.125Q6.05 22.75 6.05 17.9Q6.05 16.35 6.45 14.875Q6.85 13.4 7.6 12.1L14.85 19.35L19.45 15.05L12 7.6Q13.3 6.85 14.75 6.425Q16.2 6 17.7 6Q22.65 6 26.125 9.475Q29.6 12.95 29.6 17.9Q29.6 19.1 29.35 20.25Q29.1 21.4 28.7 22.55L41.65 35.45Q42.2 36 42.2 36.775Q42.2 37.55 41.65 38.1L37.85 41.6Q37.3 42.15 36.55 42.15Q35.8 42.15 35.25 41.6ZM36.65 38.75 38.65 36.75 25 23.1Q25.8 22.05 26.2 20.625Q26.6 19.2 26.6 17.9Q26.6 14.15 23.825 11.55Q21.05 8.95 17.5 8.9L22.55 14.05Q23 14.5 23 15.15Q23 15.8 22.55 16.25L15.95 22.45Q15.5 22.9 14.85 22.9Q14.2 22.9 13.75 22.45L8.9 17.65Q9.05 21.5 11.625 24Q14.2 26.5 17.7 26.5Q18.95 26.5 20.35 26.1Q21.75 25.7 22.8 24.9ZM23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Z"/></svg>
                  System
                </NavLink>
              </NavItem>

                </ul>
                <hr></hr>
                <LoginPartial></LoginPartial>
                    
                    {/* <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle"></img>
                        <span className="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"></hr>
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul> */}
            </div>
        </div>
  );
}

/** */