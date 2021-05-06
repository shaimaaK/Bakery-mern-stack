import React, { useState } from 'react';

const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const UpdatePasswordScreen =()=>{

    const [updateState, setUpdateState]= useState('idle')
    const [errState, setErrState]= useState([])
    const errors=[];
    let emailField;
    let emailFieldForUpdate;
    let oldPasswordField;
    let newPasswordField;
    let newPasswordFieldForUpdate;


    const formData = new FormData();
    const changePassword =()=>{
    
        emailFieldForUpdate=emailField;
        newPasswordFieldForUpdate =newPasswordField
        
        if(emailField.value.length === 0){
            errors.push("please enter your email")
            console.log("----empty email detected")
        }
        if(validateEmail(emailField.value) === false){
            errors.push("please enter a valid email")
            console.log("----invalid email detected")
        }
        if(oldPasswordField.value.length === 0){
            errors.push("please enter your current password")
            console.log("----empty old pass detected")
        }
        if(newPasswordField.value.length === 0){
            errors.push("please enter your new password")
            console.log("----empty new pass detected")
        }
        console.log("error array is: ", errors.length)
        
        if(errors.length > 0)
        {
            setUpdateState('invalid')
            setErrState(errors)
        }
        else{
            setUpdateState('loading')
        }
        formData.append('email', emailField.value);
        formData.append('password', oldPasswordField.value);
        console.log("email and password for login",  emailField.value, oldPasswordField.value)
        fetch(  
            `${process.env.REACT_APP_BACKEND}/user/login`, {
            method:'POST', 
            body:formData, 
            }  
        )
        .then ((response)=> {
            response.json()
            .then(data =>{
                if(data.jsonwebtoken)
                {
                    setUpdateState('loggedIn')
                    //pass and email checked and now lets change the pass using api
                    const formData = new FormData();
                    formData.append('email', emailFieldForUpdate.value)
                    formData.append('password', newPasswordFieldForUpdate.value)
                    fetch(
                        `${process.env.REACT_APP_BACKEND}/user/update`, {
                            method:'POST', 
                            body:formData,
                        }
                    )
                    .then((dbDocument)=>{ 
                        console.log(dbDocument);
                        setUpdateState('successful')
                        setErrState([])
                        console.log("update is successful")

                        }
                    )
                    .catch(err => {
                        console.log(err)
                        setUpdateState('fail')
                        }
                    )
                    
                }
                else{
                    setUpdateState('fail')
                    console.log("password or email is incorrect thus failed")
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
        <h2 style={{'margin-top':'200px', 'color':'black', 'text-align':'center'}}>Change Your Password</h2>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="card shadow-lg col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 m-5 p-5">

                        <div class="form-floating mb-3">
                            <label for="floatingInput">Email</label>
                            <input ref={(element) => emailField= element} type="text" class="form-control" id="floatingInput" required/>
                        </div>
                        <div class="form-floating mb-3">
                            <label for="floatingPassword">Current Password</label>
                            <input ref={(element) => oldPasswordField= element} type="password" class="form-control" id="floatingPassword" required/>
                        </div>
                        <div class="form-floating mb-3">
                            <label for="floatingPassword">New Password</label>
                            <input ref={(element) => newPasswordField= element} type="password" class="form-control" id="floatingPassword2" required/>
                        </div>
                        {
                            (updateState === 'idle') && <button className="btn btn-primary" onClick={changePassword}>SUBMIT</button>
                        }
                        {
                            (updateState=== 'loading') && <p>Please Wait untill we check your password and email....... </p>
                        }
                        {
                            (updateState === 'successful') &&  
                            <div>
                                <button className="btn btn-primary col-12" onClick={changePassword}>SUBMIT</button>
                                <div class="alert alert-success mt-2">Password is changed Successfully</div>
                            </div>
                        }
                        {
                            (updateState === 'fail' || updateState === 'invalid') && 
                            <div>
                                <button className="btn btn-primary col-12" onClick={changePassword}>SUBMIT</button>
                                <div className="alert alert-danger mt-2">
                                    <ul>
                                        {
                                            errState.map( error => <li>- {error}</li> )
                                        }
                                    </ul>
                                </div>
                            </div>
                        }
                </div>
            </div>
        </div>
    </div>
    )

}
export default UpdatePasswordScreen