import React, { useState, useContext } from 'react';
import AppContext from '../AppContext'
import history from '../history';



const LoginScreen = () =>{

    const [globalState, setGlobalState] = useContext(AppContext)
    const [loginState, setLoginState]= useState(
        {
            reason:'idle'
        }
    )

    let emailField;
    let passwordField;

    const formData = new FormData();
    const login =()=>{
    
        const errors=[];
        if(emailField.value.length === 0)
            errors.push("please enter your email")
        if(passwordField.value.length === 0)
            errors.push("please enter your password")
        
        if(errors.length > 0)
        {
            setLoginState(
                {
                    reason:'invalid'
                }
            )
        }
        else{
            setLoginState(
                {
                    reason:'loading'
                }
            )
        }
        //setLoginState('sending')
        formData.append('email', emailField.value);
        formData.append('password', passwordField.value);
        fetch(
            `${process.env.REACT_APP_BACKEND}/admin/login`, {

            method:'POST', 
            body:formData, 
            }
            
        )

        .then ((response)=> {
            response.json()
            .then(data =>{
                
                if(data.avatar){
                    localStorage.setItem('avatar', data.avatar)
                }
                history.push('/');
                window.location.reload(false);
                if(data.jsonwebtoken)
                {
                    
                    setLoginState(
                        {
                            reason:'successful'
                        }
                    )
                    setGlobalState(
                        {
                            ...globalState,
                            loggedIn:true

                        }
                    )
                    localStorage.setItem('jwt', data.jsonwebtoken)

                }
                else{
                    setLoginState(
                        {
                            reason:'fail'
                        }
                    );
                    console.log("login failed")
                }

            })
            .catch(err => console.log(err))
        }
        )
        
        .catch(err =>
            console.log(err)
        
        )

    
    }

    return(
        <div className="container">
        <h2 style={{'margin-top':'200px', 'color':'black', 'text-align':'center'}}>Login to your Account</h2>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="card shadow-lg col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 m-5 p-5">

                        <div class="form-floating mb-3">
                            <label for="floatingInput">Email</label>
                            <input ref={(element) => emailField= element} type="text" class="form-control" id="floatingInput" required/>
                        </div>
                        <div class="form-floating mb-3">
                            <label for="floatingPassword">Password</label>
                            <input ref={(element) => passwordField= element} type="password" class="form-control" id="floatingPassword" required/>
                        </div>
                        {
                            (loginState.reason === 'idle') && <button className="btn btn-primary" onClick={login}>LOGIN</button>
                        }
                        {
                            (loginState.reason === 'loading') && <p>Please Wait untill we check your password and email....... </p>
                        }
                        {
                            (loginState.reason === 'successful') &&  
                            <div>
                                <button className="btn btn-primary col-12" onClick={login}>LOGIN</button>
                                <div class="alert alert-success mt-2">Logged in Successfully</div>
                              
                            </div>
                        }
                        {
                            (loginState.reason === 'fail' || loginState.reason === 'invalid') &&  
                            <div>
                                <button className="btn btn-primary col-12" onClick={login}>LOGIN</button>
                                <div class="alert alert-danger mt-2">failed, please try again with different email or/and password</div>
                                {console.log('failed, please try again with different email or/and password')}
                            </div>
                        }
                </div>
            </div>
        </div>
    </div>
    )

}
export default LoginScreen