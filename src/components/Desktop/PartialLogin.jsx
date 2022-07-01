import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
//import { NavLink } from "react-router-dom";
import { ApiNode } from "../../middleware/thunk";
import Button from "../SystemComponents/Button"

export default function LoginPartial (props)  {
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
    <div className="w-100 d-flex justify-content-center">
        {auth === true ? (
            <div className="pb-4 d-flex flex-column justify-content-center w-100">
                <h5 className="text-Mid text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#5836e5" viewBox="0 0 48 48"><path d="M24 23.95Q20.7 23.95 18.6 21.85Q16.5 19.75 16.5 16.45Q16.5 13.15 18.6 11.05Q20.7 8.95 24 8.95Q27.3 8.95 29.4 11.05Q31.5 13.15 31.5 16.45Q31.5 19.75 29.4 21.85Q27.3 23.95 24 23.95ZM8 40V35.3Q8 33.4 8.95 32.05Q9.9 30.7 11.4 30Q14.75 28.5 17.825 27.75Q20.9 27 24 27Q27.1 27 30.15 27.775Q33.2 28.55 36.55 30Q38.1 30.7 39.05 32.05Q40 33.4 40 35.3V40ZM11 37H37V35.3Q37 34.5 36.525 33.775Q36.05 33.05 35.35 32.7Q32.15 31.15 29.5 30.575Q26.85 30 24 30Q21.15 30 18.45 30.575Q15.75 31.15 12.6 32.7Q11.9 33.05 11.45 33.775Q11 34.5 11 35.3ZM24 20.95Q25.95 20.95 27.225 19.675Q28.5 18.4 28.5 16.45Q28.5 14.5 27.225 13.225Q25.95 11.95 24 11.95Q22.05 11.95 20.775 13.225Q19.5 14.5 19.5 16.45Q19.5 18.4 20.775 19.675Q22.05 20.95 24 20.95ZM24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45ZM24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Z"/></svg>
                    {Name}
                </h5>
                <div className="align-self-center">
                    <Button className="btn btn-lg btn-principal btn-block p-0 px-4 pb-1" type="button" onClick={()=>handleOnClick()}>Logout</Button>
                </div>
            </div>
        
      ) : (
        <div className="pb-4 d-flex flex-column justify-content-center">
                <Button className="btn btn-lg btn-principal btn-block p-0 px-4 pb-1 col" type="button" onClick={()=>handleOnClick()}>Login</Button>
            </div>
      )}
    </div>
  );
};

