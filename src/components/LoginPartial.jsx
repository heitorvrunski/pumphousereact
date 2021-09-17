import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { ApiNode } from "../middleware/thunk";

const UsersConfig = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const Name = useSelector((state) => state.Auth.name);
  const auth = useSelector((state) => state.Auth.isAuth);
  const handleOnClick = () => {
    if (auth === true) {
      dispatch(ApiNode.Logoff());
      history.push("/login");
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {}, [Name, auth]);
  return (
    <div className="d-flex" onClick={props.onClick}>
      {auth === true ? (
        <div className="text-primary text-Link ">
          {Name}
          <NavLink
            className="text-primary text-Link ms-3 is-not-active active"
            to="/login"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              className="icon-Login me-2"
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
          className="text-primary text-Link me-2 is-not-active "
          activeClassName="active"
          to="/login"
          onClick={handleOnClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            className="icon-Login me-2"
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
