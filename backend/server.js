const express = require('express')
const server = express()
const mongoose = require('mongoose')
const users = require('./routes/users.js')
const admins = require('./routes/admins.js')
const bodyParser = require('body-parser')
const products = require('./routes/products.js')
const wishlist = require('./routes/wishlist.js')
const reservations = require('./routes/reservations.js')
const expressFormData = require('express-form-data')
const cors = require('cors')
require('dotenv').config();
const passport = require('passport');
const cloudinary = require('cloudinary').v2

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = process.env.SECRET;

// Options for passport-jwt
const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

// This function is what will read the contents (payload) of the jsonwebtoken
const passportJwt = (passport) => {
    passport.use(
        new JwtStrategy(
            passportJwtOptions,
            (jwtPayload, done) => {

                // Extract and find the user by their id (contained jwt)
                UsersModel.findOne({ _id: jwtPayload.id })
                    .then(
                        // If the document was found
                        (document) => {
                            return done(null, document);
                        }
                    )
                    .catch(
                        // If something went wrong with database search
                        (err) => {
                            return done(null, null);
                        }
                    )
            }
        )
    )
};

// Invoke passportJwt and pass the passport npm package as argument
passportJwt(passport);
//connect to the database using mangoose


////// config te cloudinary
cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    }

);

////////to create a user login\\\\\\\\\ 
//1. create server and connect to mangodb using mangoose
const connectionConfig = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.CONNECTION_STRING, connectionConfig)
    .then(
        (dbDocument) => {
            console.log('DB is connected')
        }
    )
    .catch(
        (error) => {
            console.log('error occured', error)

        }
    )


server.use(cors())


// Tell express how to use body-parser
server.use(bodyParser.urlencoded({ extended: false }));
// Also tell express to recognize JSON
server.use(bodyParser.json());
server.use(expressFormData.parse());

server.use(cors())



server.use(
    '/user', users
)
// To user products Route
server.use(
    '/product',
    products
)

server.use(
    '/wishlist',
    wishlist
)

server.use(
    '/reserve-table',
    reservations
)
server.use(
    '/admin', admins
)
const port = process.env.PORT || 3002;
server.listen(
    port, () => {
        console.log(`Server Running on http://localhost:${port}/`)
    }
)
