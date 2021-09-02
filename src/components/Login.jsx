import React, { Component, useEffect } from 'react';
import PumpCard  from './PumpCard.jsx';
import  { Redirect,useHistory  } from 'react-router-dom'
import axios from 'axios'



export default function Login(){
    const history = useHistory();

    const login = {user:"",pw:""};
    const handleChangeUser = event =>login.user = event.target.value;
    const handleChangePw = event =>login.pw = event.target.value;
    const handleSubmit = event =>{
        event.preventDefault()
        if(login.user.trim()&&login.pw.trim()){
            var serverURL = 'http://localhost:3000'

            axios.post(`${serverURL}/node/api/auth/login`,
                JSON.stringify({user: login.user, password: login.pw }),
                { withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                }).then(res => {
                    if(res.status ===200){
                        console.log('logged!');
                        window.location.href = '/'
    
                    }
                });
              
              
              /*
            fetch(`${serverURL}/node/api/auth/login`, {
                method: "POST",
                body: JSON.stringify({user: login.user, password: login.pw }
                ),
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },


            }).then( (req, response, next) => {
                // reset form
                console.log(req);
                console.log(response);
                console.log(next);


                if(response.ok===true){
                    console.log('logged!');

                     for(let entry of response.headers.entries()) {
                        console.log('header', entry);
                      }
                     console.log(response.headers);
                    //return <Redirect to='/'  />

                }
              })
              .catch(error => {
                console.log(error)

              })
*/


        }

    }

    
    return(
        <div className="text-center align-middle">
        <form className="form-signin mt-5" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Login</label>
            <input type="text"  className="form-control" placeholder="Login" required="" autoFocus=""  onChange={handleChangeUser}></input>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" className="form-control" placeholder="Password" required=""  onChange={handleChangePw}></input>
            <button className="btn btn-lg btn-primary btn-block my-1" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">© 2021</p>
        </form>
        </div>

        );
        
}

/*
$.ajax({
            url: `${serverURL}/node/api/auth/login`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true,
                samesite:'none'
            },
            data: JSON.stringify({"user": serverUser, "password": serverPw}),
            processData: false,
            success: function (data,textStatus,jQxhr) {
                console.log('logged!');
                socket = io.connect("http://localhost:3000",
                {   withCredentials: true

                });
                socket.emit("joined");
                socket.on("update", function(msg) {
                    if (ready) {
                        $('.chat').append('<li class="info">' + msg + '</li>')
                    }
                }); 
            
                socket.on("loadData", function(msg) {
                    console.log(msg)
                    if (ready) {
                        
                            $(".chat").append(`<li class="field"><div class="msg">${msg.browseName}:${msg.value}  (${msg.timestamp})</div></li>`);
                            
                    }
                });
                
                
            },
            error: function (jQxhr,textStatus, errorThrown) {
                console.log("error" + errorThrown);
            }
        })
*/
