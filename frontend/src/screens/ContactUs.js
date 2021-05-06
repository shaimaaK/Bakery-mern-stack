import emailjs from "emailjs-com";
import React from 'react';
import{ init } from 'emailjs-com';
init("user_wjXMX77bcZtKGv77ZFuAl");

export default function ContactUs() {

    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm('service_fjfmrak', 'template_6pwbli4', e.target, 'user_wjXMX77bcZtKGv77ZFuAl')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

    return(
        <div>
            <div className="container">
            <h2 style={{'margin-top':'150px', 'color':'black', 'text-align':'center'}}>Get in Touch</h2>
            <div className="row d-flex justify-content-center">
                    <div className="card shadow-lg col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 m-5 p-5">
            <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Name" name="name"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email Address" name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Subject" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="genric-btn primary" value="Send Message"></input>
                        </div>
                    </div>
                </form>
                   </div>
            </div>
            </div>
        </div>
    )
}

