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
                                <svg id="Layer_1" data-name="Layer 1" width="30px" className="me-2 active-SVG" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 81.09 79.67"><path d="M62.21,62.71a8.15,8.15,0,0,0-1.64-5.08l-3.31,2.59c1,2.91.43,5-2,7a13.92,13.92,0,0,1-3.49,2.12,27.36,27.36,0,0,1-14.62,1.49,18.39,18.39,0,0,1-8.36-3c-1.45-1-2.79-2.18-3.1-4a1,1,0,0,0-.74-.64c-1.23-.06-2.47,0-3.87,0V67a8.6,8.6,0,0,0,1.23,4.43,13.33,13.33,0,0,0,5.16,4.71,26.91,26.91,0,0,0,11.67,3.18c6.17.35,12.08-.45,17.4-3.59,3.66-2.16,5.9-5.13,5.66-9.38C62.14,65.12,62.21,63.91,62.21,62.71Z" transform="translate(-0.02 0.31)"/><path d="M80.35,56c-1.48,0-3,0-4.43,0-2.28,0-3.52-1.81-3.52-5V37.86c0-5.11,0-10.22,0-15.32s-2.68-9.44-6.27-9.93a58,58,0,0,0-6.33-.15c-.38,0-.48.24-.48.72,0,1.39,0,2.77,0,4.16,0,.69.23.81.65.81,1.64,0,3.28,0,4.91,0,2.31.07,3.46,1.77,3.46,5q0,14.13,0,28.28c0,4.93,2.43,9.32,5.81,10a46.29,46.29,0,0,0,6.94.38c0-1.75,0-3.26,0-4.76C81.12,56.27,81,56,80.35,56Z" transform="translate(-0.02 0.31)"/><path d="M24,54.56a18.41,18.41,0,0,0,8.25,5,30.41,30.41,0,0,0,14.27,1A22.68,22.68,0,0,0,58,55.79a9.62,9.62,0,0,0,3.84-6.44,54.62,54.62,0,0,0,0-8.09,8.35,8.35,0,0,0-2.56-5.14c0,2-.09,3.65,0,5.34C59.57,45.4,57.63,48,54.5,50a22.86,22.86,0,0,1-11.63,3.19c-5.16.13-10.12-.71-14.57-3.56-2.78-1.79-4.47-4.25-4.29-7.78.08-1.51,0-3,0-4.54,0-.28-.05-.55-.1-1.06A8.56,8.56,0,0,0,21.52,41a67.94,67.94,0,0,0-.21,7A9.59,9.59,0,0,0,24,54.56Z" transform="translate(-0.02 0.31)"/><path d="M29.5,13.25c-.64,0-1.28,0-2.07,0a4.74,4.74,0,0,0,.91,1.31,20.93,20.93,0,0,0,3.91,2.6c4.87,2.11,10,2.2,15.23,1.26a14.9,14.9,0,0,0,7.46-3.23,17.24,17.24,0,0,0,1.61-1.95c-.93,0-1.61,0-2.28,0-1.66-.11-2.55-1-2.55-2.44,0-1.17,0-2.34,0-3.51,0-.49-.2-.68-.73-.65s-1.14,0-1.7,0c-5.41,0-10.81,0-16.21,0-.78,0-1,.25-.94.88,0,1.07,0,2.14,0,3.2C32.14,12.26,31.25,13.13,29.5,13.25Z" transform="translate(-0.02 0.31)"/><path d="M26.55,11.66a5,5,0,0,0,1.54.07,1.31,1.31,0,0,0,1.36-1.54c-.06-1.88,0-3.76,0-5.63,0-.69.15-1,.92-1q11.3,0,22.61,0c.72,0,1,.24.95,1,0,1.88,0,3.76,0,5.63a1.32,1.32,0,0,0,1.31,1.58,5.62,5.62,0,0,0,1.16,0,1.33,1.33,0,0,0,1.37-1.53c-.06-2.4,0-4.81,0-7.21s-1-3.3-3.3-3.3c-4.26,0-8.52,0-12.77,0s-8.71,0-13.06,0a2.73,2.73,0,0,0-2.94,2.87c0,2.63,0,5.27,0,7.9A1.08,1.08,0,0,0,26.55,11.66Z" transform="translate(-0.02 0.31)"/><path d="M33.39,29.33a3.8,3.8,0,0,0-.07.53c0,6.09,0,12.19,0,18.28a1,1,0,0,0,.6.71c1.84.36,3.68.66,5.53.93,1.08.16,1.12.09,1.12-.91q0-8.76,0-17.53c0-.35,0-.7-.06-1Z" transform="translate(-0.02 0.31)"/><path d="M43.91,49.82c1.71-.28,3.41-.58,5.13-.82.74-.11,1-.45.94-1.18,0-4.46,0-8.93,0-13.39v-5.1c-2.23.28-4.3.56-6.38.8-.56.06-.53.41-.53.77,0,6.06,0,12.11,0,18.17C43.05,49.72,43.29,49.92,43.91,49.82Z" transform="translate(-0.02 0.31)"/><path d="M57.58,16.27C53.17,20.69,47.65,22,41.77,22s-11.46-1.3-16-5.62a12,12,0,0,1,0,2.48,3.63,3.63,0,0,0,1.21,3.46,13.79,13.79,0,0,0,2.46,2.06,20.25,20.25,0,0,0,8.72,2.89A25.47,25.47,0,0,0,52.74,25.1C56.86,23.08,58.34,20.39,57.58,16.27Z" transform="translate(-0.02 0.31)"/><path d="M30.88,27.56a13.45,13.45,0,0,1-4.56-3.07,3.56,3.56,0,0,1-.39-.72l-.27.23c0,.14,0,.27,0,.41,0,5.74,0,11.48,0,17.22a5.14,5.14,0,0,0,.73,2.4c1.13,1.92,3,2.89,5,3.77a3.37,3.37,0,0,0,.11-.4c0-6.36,0-12.73,0-19.1A1.09,1.09,0,0,0,30.88,27.56Z" transform="translate(-0.02 0.31)"/><path d="M51.89,48.38l.25.19c1.08-.66,2.21-1.25,3.23-2a5.63,5.63,0,0,0,2.37-5c-.08-5.11,0-10.23,0-15.35,0-.29,0-.58,0-1a3.36,3.36,0,0,0-.4.36,11.56,11.56,0,0,1-4.65,3.15,1,1,0,0,0-.75,1.16c0,4.73,0,9.46,0,14.18Z" transform="translate(-0.02 0.31)"/><path d="M40.72,66.71c-1.26,0-1.28-.06-1.28-1.38,0-3,0-3-3-3.09a1.74,1.74,0,0,0-.35.1V66c-.77-.27-1.35-.46-1.91-.68-2.39-.93-2.41-1-2.51-3.5,0-.31-.16-.78-.38-.88-1.35-.63-2.73-1.17-4.09-1.74-1.09,2,.22,5,1.94,6.28a14.81,14.81,0,0,0,2.37,1.54,21.51,21.51,0,0,0,8.95,2.13,23,23,0,0,0,11.29-2.11A8.78,8.78,0,0,0,56,63.35a4.54,4.54,0,0,0,.17-4.17,23.61,23.61,0,0,1-3.21,1.39c-1.19.31-1.43,1-1.33,2.07.05.49,0,1.22-.25,1.47a8.39,8.39,0,0,1-4.18,1.82V62.19l-3.24.39v1C43.89,66.82,43.89,66.82,40.72,66.71Z" transform="translate(-0.02 0.31)"/><path d="M0,53.65c0,2.15.06,4.09,0,6a2.94,2.94,0,0,0,1.68,3,10.06,10.06,0,0,0,10-.07c.6-.33,1.35-1.06,1.39-1.65.17-2.27.07-4.56.07-6.87C8.89,57.65,3.17,57.54,0,53.65Z" transform="translate(-0.02 0.31)"/><path d="M15,52.49h5.73c-.23-.72-.44-1.3-.6-1.89-.43-1.5-.42-1.5-2-1.5H13.19c.58,1.29,1,2.3,1.5,3.31C14.71,52.46,14.86,52.49,15,52.49Z" transform="translate(-0.02 0.31)"/><path d="M23.48,60.4a.85.85,0,0,0,.79-.9v-.1a3.17,3.17,0,0,0-.58-1.92c-.91-1-1.78-2.12-2.69-3.14a1.51,1.51,0,0,0-.9-.55c-1.61,0-3.22,0-4.82,0-.51,0-.73.19-.73.8,0,1.67,0,3.35,0,5,0,.68.26.84.79.82h8.15Z" transform="translate(-0.02 0.31)"/><path d="M2.59,53.29a9.39,9.39,0,0,0,8.24,0A2.23,2.23,0,0,0,12.24,51c0-3.14,0-6.29,0-9.43a2.31,2.31,0,0,0-1.43-2.3,9.36,9.36,0,0,0-8.32,0,2.21,2.21,0,0,0-1.36,2.24c.05,1.55,0,3.11,0,4.67s0,3.17,0,4.76A2.26,2.26,0,0,0,2.59,53.29ZM6.92,39.65c1.84,0,3.33.59,3.33,1.32s-1.49,1.32-3.33,1.32S3.6,41.7,3.6,41,5.09,39.65,6.92,39.65Z" transform="translate(-0.02 0.31)"/></svg>

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