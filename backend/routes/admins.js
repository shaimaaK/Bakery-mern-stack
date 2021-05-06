const express = require('express')
const router = express.Router()
const AdminsModel = require('../models/AdminsModel')
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;
const cloudinary = require('cloudinary').v2

router.post(
    '/add', (req, res) => {
        const formData = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
        };
        const AdminModel = new AdminsModel(formData)
        AdminsModel
            .findOne({ email: formData.email })
            .then(
                async (dbDocument) => {
                    // 3.1) If email exists
                    if (dbDocument) {
                        // Then reject registration
                        res.send("Sorry. An account with thay email already exists");
                    }
                    // 3.2) If email does not exists
                    else {
                        if (Object.values(req.files).length > 0) {
                            const files = Object.values(req.files);

                            await cloudinary.uploader.upload(
                                files[0].path,
                                (cloudinaryErr, cloudinaryResult) => {
                                    //add the url of the picture to new user model
                                    if (cloudinaryErr) {
                                        console.log(cloudinaryErr);
                                    }
                                    //add the url of hte picture to newUserModel
                                    AdminModel.avatar = cloudinaryResult.url;
                                    console.log(cloudinaryResult.url)

                                }

                            )
                        }

                        bcryptjs.genSalt(
                            (err, salt) => {
                                bcryptjs.hash(
                                    formData.password, salt, (err, EncryptedPassword) => {
                                        AdminModel.password = EncryptedPassword;
                                        AdminModel.save()
                                            .then
                                            (
                                                dbDocument =>
                                                    res.send("<h1>account created</h1>")
                                            )
                                            .catch(
                                                err =>
                                                    res.send(err)

                                            )
                                    }
                                )
                            }
                        )
                    }
                }
            )

    }
)
router.post(
    '/login',          // http://www.myapp.com/users/create
    (req, res) => {

        // 1) Capture user account details (e.g, first name, last name, etc.)
        const formData = {
            email: req.body.email,
            password: req.body.password,
        };

        // Step 2a. In database, find account that matches email
        AdminsModel.findOne(
            { email: formData.email },
            (err, document) => {

                // Step 2b. If email NOT match, reject the login request
                if (!document) {
                    res.json({ message: "Please check email or password" });
                }

                // Step 3. If there's matching email, examine the document's password
                else {

                    // Step 4. Compare the encrypted password in db with incoming password
                    bcryptjs.compare(formData.password, document.password)
                        .then(
                            (isMatch) => {

                                // Step 5a. If the password matches, generate web token (JWT)
                                if (isMatch === true) {
                                    // Step 6. Send the JWT to the client
                                    const payload = {
                                        id: document.id,
                                        email: document.email,
                                        avatar: document.avatar || ''
                                    };
                                    jwt.sign(
                                        payload,
                                        secret,
                                        (err, jsonwebtoken) => {
                                            res.json(
                                                {

                                                    message: 'Login successful',
                                                    jsonwebtoken: jsonwebtoken,
                                                    avatar:payload.avatar
                                                }
                                            )
                                        }
                                    )

                                }

                                // Step 5b. If password NOT match, reject login request
                                else {
                                    res.json({ message: "Please check email or password" })
                                }
                            }
                        )
                }
            }
        )
    }
)
router.post(
    '/update', (req, res) => {
        AdminsModel.findOne({ email: req.body.email })
            .then(UserFound => {
                if (!AdminFound)
                    res.send('this account is not created. Enter the Email used for this account')
                else {
                    bcryptjs.genSalt(
                        (err, salt) => {
                            bcryptjs.hash(
                                req.body.password, salt, (err, EncryptedPassword) => {
                                    UserFound.password = EncryptedPassword;
                                    UserFound.save()
                                        .then
                                        (
                                            dbDocument =>
                                                res.send("<h1>password is updated successfully</h1>")
                                        )
                                        .catch(
                                            err =>
                                                res.send(err)

                                        )
                                }
                            )
                        }
                    )
                }

            }

            )
            .catch((err) => res.send("the  is not found"))
    }
)

router.get(
    '/list',                 
    (req, res) => {

        AdminsModel
        .find()
        .then(
            (dbDocuments) => {
                res.send(dbDocuments)
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )

    }
);
module.exports = router
