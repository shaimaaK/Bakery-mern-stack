import React, { useState } from 'react';

const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,50}$/;
    return re.test(password);
}


const RegisterScreen = () => {
    const [accountState, set_accountState] = useState('idle')
    const [errorsState, setErrorsState] = useState([]);

    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;
    let phoneNumberField;
    let usernameField;
    let addressField;
    let files;
    const formData = new FormData();

    const attachFile = (evt) => {
        const files = Array.from(evt.target.files);
        files.forEach(
            (file, index) => {
                formData.append(index, file);
            }
        )
    }

    const register = () => {
        const errors = [];
        // 1. Validate the fields
        if (firstNameField.value.length === 0) {
            errors.push("Please enter your first name")
        }
        if (lastNameField.value.length === 0) {
            errors.push("Please enter your last name")
        }
        if (validateEmail(emailField.value) === false) {
            errors.push("Please enter a valid email address")
        }
        if (validatePassword(passwordField.value) === false) {
            errors.push("Please enter a password between 8 to 16 characters")
        }

        // 1.1 If fields are invalid, setState("validation failed")
        if (errors.length > 0) {
            set_accountState("validation failed");
            setErrorsState(errors);
        }
        // 1.2 If the fields are valid, setState("sending")
        else {
            // 2 Show "sending..." and invoke the fetch()
            set_accountState("sending");
            formData.append('firstName', firstNameField.value);
            formData.append('lastName', lastNameField.value)
            formData.append('username', usernameField.value)
            formData.append('email', emailField.value)
            formData.append('password', passwordField.value)
            formData.append('phoneNumber', phoneNumberField.value)
            formData.append('address', addressField.value)
            if (files) {
                formData.append('files', files);
                console.log('appended')
            }
            console.log()
            fetch(
                `${process.env.REACT_APP_BACKEND}/admin/add`,
                {
                    method: 'POST',
                    body: formData
                }
            )
                .then(
                    () => {
                        set_accountState('successful')
                        setErrorsState([])
                    }
                )
                .catch((err) => {
                    set_accountState('unsuccessful')
                    console.log(err)
                }
                )


        }

    }
    return (
        <form className="container">
            <h2 style={{ 'margin-top': '150px', 'color': 'black', 'text-align': 'center' }}>Create A New Account</h2>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="card shadow-lg col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 m-5 p-5">
                      
                        <div class="form-floating mb-3">
                            <label for="fistName">First Name<span style={{ 'color': 'red' }}>*</span></label>
                            <input ref={(element) => firstNameField = element} type="text" class="form-control" id="fistName" required />
                        </div>
                        <div class="form-floating mb-3">
                            <label for="lastName">Last Name<span style={{ 'color': 'red' }}>*</span></label>
                            <input ref={(element) => lastNameField = element} type="text" class="form-control" id="lastName" required />
                        </div>
                        <div class="form-floating mb-3">
                            <label for="username">Username<span style={{ 'color': 'red' }}>*</span></label>
                            <input ref={(element) => usernameField = element} type="text" class="form-control" id="username" required />
                        </div>
                        <div class="form-floating mb-3">
                            <label for="email">Email<span style={{ 'color': 'red' }}>*</span></label>
                            <input ref={(element) => emailField = element} type="text" class="form-control" id="email" required />
                        </div>
                        <div class="form-floating mb-3">
                            <label for="password">Password<span style={{ 'color': 'red' }}>*</span></label>
                            <input ref={(element) => passwordField = element} type="password" class="form-control" id="password" required />
                            <div class="form-text" style={{ 'color': 'red', 'font-size': 'smaller' }}> Must be 8-50 character and it must include at least one uppercase letter and one lowercase letter </div>
                        </div>
                        <div class="form-floating mb-3">
                            <label for="phone">Phone Number</label>
                            <input ref={(element) => phoneNumberField = element} type="text" class="form-control" id="phone" />
                        </div>
                        <div class="form-floating mb-3">
                            <label for="address" Address>Address</label>
                            <input ref={(element) => addressField = element} type="text" class="form-control" id="address" />
                        </div>
                        <div class="custom-file">
                            <input onChange={attachFile} type="file" class="custom-file-input" id="avatar" />
                            <label class="custom-file-label" for="avatar">Choose file</label>
                        </div>
                        <br /> <br />


                        {
                            accountState === "idle" && <button onClick={register} className="btn btn-primary"><span style={{ 'font-weight': 'bold' }}>CREATE ACCOUNT</span></button>
                        }
                        {
                            accountState === "sending" && <p>Please Wait untill the account is created successfully....... </p>
                        }
                        {
                            (accountState === "successful") &&
                            <div>
                                <button onClick={register} className="btn btn-primary col-12"><span style={{ 'font-weight': 'bold' }}>CREATE ACCOUNT</span></button>
                                <div class="alert alert-success mt-2">Account Created Successfully</div>
                            </div>
                        }
                        {
                            (accountState === "unsuccessful") &&
                            <div>
                                <button onClick={register} className="btn btn-primary col-12"><span style={{ 'font-weight': 'bold' }}>CREATE ACCOUNT</span></button>
                                <div class="alert alert-danger mt-2">Error, please try again</div>
                            </div>
                        }
                        {
                            accountState === "validation failed" &&
                            <div>
                                <button onClick={register} className="btn btn-primary col-12"><span style={{ 'font-weight': 'bold' }}>CREATE ACCOUNT</span></button>
                                <div className="alert alert-danger mt-2">
                                    <ul>
                                        {
                                            errorsState.map(
                                                (error, index) => <li key="index">- {error}</li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </form>
    )
}
export default RegisterScreen