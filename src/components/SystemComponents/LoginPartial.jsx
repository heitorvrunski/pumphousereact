import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { ApiNode } from "../../middleware/thunk";

const UsersConfig = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const Name = (useSelector((state) => state.Auth.name))?.split("@")[0]??"";
  const auth = useSelector((state) => state.Auth.isAuth);
  const handleOnClick = () => {
    if (auth === true) {
      dispatch(ApiNode.Logoff());
      window.location.href = "/#/login"
      //history.push("/login");
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {}, [Name, auth]);
  return (
    <div className="d-flex" onClick={props.onClick}>
      {auth === true ? (
        <div className="text-primary text-Link is-not-active ">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" style={{marginRight:"0.5rem",opacity:"0.7"}} viewBox="0 0 30 30"><g data-name="Layer 2"><g data-name="Layer 1"><g><circle cx="15" cy="15" r="15"></circle></g><path data-name="<Path>" d="M23.89 23.63C23.2 24.06 21 25 15 25s-8.2-.94-8.89-1.37a.58.58 0 0 1-.28-.54A3 3 0 0 1 8 20.41 36.65 36.65 0 0 0 12.43 19a1 1 0 0 0 .15-1.63 5.65 5.65 0 0 1-1.74-3.19c-.48-.36-1.57-2.47-.6-2.86a4.6 4.6 0 0 1 1.55-5c2.55-2 6.42.62 7.43-1.27a.15.15 0 0 1 .25 0 3 3 0 0 1 .12 3.13 7.43 7.43 0 0 1 .13 3.14c1.27.33 0 2.54-.56 2.88a5.62 5.62 0 0 1-1.74 3.19 1 1 0 0 0 .15 1.61A36.65 36.65 0 0 0 22 20.41a3 3 0 0 1 2.17 2.68.58.58 0 0 1-.28.54z" fill="#fff" fillRule="evenodd"></path></g></g></svg>
          {Name}
          <NavLink
            className="text-primary text-Link ms-3 is-not-active "
            to="/login"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"

              className=" me-1 Icon-Principal"
              onClick={handleOnClick}
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" />
              </g>
            </svg>
          </NavLink>
        </div>
      ) : (
        <NavLink
          className="text-primary text-Link me-2 is-not-active active"
          activeClassName="active"
          to="/login"
          style={{opacity:"0.7"}}
          onClick={handleOnClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            className=" me-1 Icon-Principal"
            viewBox="0 0 24 24"
            width="24px"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
          </svg>
          login
        </NavLink>
      )}
    </div>
  );
};

export default UsersConfig;
