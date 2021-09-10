import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { SetExpiresToken } from '../store/actions';

import Toast from './Toast';

export default function Login ()  {
    const dispatch = useDispatch();
    const history = useHistory()

    const [state,setState] = useState({
        login: '',
        password: '',

    });

    const [error,setError] = useState({
        errorMsg: '',
    });

    //const [errorShow,setErrorShow] = useState(false);  

    
    const handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        setState((prevState) => ({
            ...prevState,
            [name]: value
          }));
    }
    const handleSubmit = event => {
        event.preventDefault();
        const login = {
            user: state.login,
            pw: state.password
        }
        if (login.user.trim() && login.pw.trim()) {
            var serverURL = `http://${window.location.hostname}:3000`

            axios.post(`${serverURL}/node/api/auth/login`,
                JSON.stringify({ user: login.user, password: login.pw }),
                {
                    withCredentials: true,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then(res => {
                    if (res.status === 200) {
                        console.log('logged!');

                        dispatch(SetExpiresToken(res.data))

                        history.push("/");

                    }
                }).catch(function (error) {
                    setError({
                        errorMsg: 'Invalid user/password !',
                    })
                    
                });
        }else{
            setError({
                errorMsg: 'Enter Login and Password',
            })
            
        }
    }
    const onChangeErrorMessage = () =>{
        setError({
            errorMsg: '',
        })
    }

    

        return (
            <div className="text-center align-middle">
                <form className="form-signin mt-5" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Login</label>
                    <input type="text" className="form-control" placeholder="Login" name="login" required="" autoFocus="" onChange={handleInputChange} ></input>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" required="" onChange={handleInputChange} ></input>
                    <button className="btn btn-lg btn-primary btn-block my-1" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2021</p>
                    
                </form>
                
                <Toast messageError={error.errorMsg} className="bg-danger text-white" onChangeErrorMessage={onChangeErrorMessage} />
            </div>

        );
    
}
/*
<div className="position-fixed bottom-0 end-0 p-3" style={{zIndex:"11"}}>
                    <div className={"toast align-items-center bg-danger toastFadeIn " + (errorShow===true?"show":"")} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex p-2 text-white">
                            <h6 className="me-2"> ERROR:</h6> {error.errorMsg}
                    </div>
                    </div>
                </div>
*/

