import React, { useState, useContext } from 'react';
import AppContext from '../AppContext'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";



const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const LoginScreen = () => {
    const history = useHistory();
    const [globalState, setGlobalState] = useContext(AppContext)
    const [loginState, setLoginState] = useState("idle")


    let emailField;
    let passwordField;
    const errors = [];

    const formData = new FormData();
    const login = () => {


        if (emailField.value.length === 0)
            errors.push("please enter your email")
        if (validateEmail(emailField.value) === false)
            errors.push("please enter a valid email")

        if (passwordField.value.length === 0)
            errors.push("please enter your password")

        if (errors.length > 0) {
            setLoginState("fail")
            console.log('state is ', loginState)

        }
        else {
            setLoginState("loading")
            console.log("state is ", loginState)

        }
        formData.append('email', emailField.value);
        formData.append('password', passwordField.value);
        fetch(
            `${process.env.REACT_APP_BACKEND}/user/login`, {

            method: 'POST',
            body: formData,
        }

        )

            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.jsonwebtoken) {
                            setLoginState("successful")
                            setGlobalState(
                                {
                                    ...globalState,
                                    loggedIn: true,
                                    user: data.user,
                                }
                            )
                            localStorage.setItem('jwt', data.jsonwebtoken)
                            localStorage.setItem('user', JSON.stringify(data.user))
                            console.log('state is ', loginState)
                            history.push("/");

                        }
                        else {
                            setLoginState("fail")
                            console.log('state is ', loginState)
                        }

                    })
                    .catch(err => console.log(err))
            }
            )

            .catch(err =>
                console.log(err)

            )


    }

    return (
        <div className="container">
            <h2 style={{ 'margin-top': '200px', 'color': 'black', 'text-align': 'center' }}>Login to your Account</h2>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="card shadow-lg col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 m-5 p-5">

                        <div class="form-floating mb-3">
                            <label for="floatingInput">Email</label>
                            <input ref={(element) => emailField = element} type="text" class="form-control" id="floatingInput" required />
                        </div>
                        <div class="form-floating mb-3">
                            <label for="floatingPassword">Password</label>
                            <input ref={(element) => passwordField = element} type="password" class="form-control" id="floatingPassword" required />
                            <Link to={`/update-password`} > did you want to reset your password</Link>
                        </div>
                        {
                            (loginState === "idle") && <button className="btn btn-primary" onClick={login}>LOGIN</button>
                        }
                        {
                            (loginState === "loading") && <p>Please Wait untill we check your password and email....... </p>
                        }
                        {
                            (loginState === "successful") &&
                            <div>
                                <button className="btn btn-primary col-12" onClick={login}>LOGIN</button>
                                <div class="alert alert-success mt-2">Logged in Successfully</div>
                            </div>
                        }
                        {
                            (loginState === "fail" && loginState !== "successful") &&
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