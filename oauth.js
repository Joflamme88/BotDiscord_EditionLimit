const BnetStrategy = require('passport-bnet').Strategy;
/*----------------- DotEnv ----------------- */
require('dotenv').config();



/*----------------- Express ----------------- */
const express = require('express');
const passport = require('passport');

const PORT = process.env.PORT || 5500;
const app = express();

app.use(express.json());
app.use(passport.initialize());

const BNET_ID = process.env.BNET_ID;
const BNET_SECRET = process.env.BNET_SECRET;

// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
  clientID: BNET_ID,
  clientSecret: BNET_SECRET,
  callbackURL: "https://localhost:5500/oauth/battlenet/callback",
  region: "eu"
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

//-----------------ROUTE------------------//
app.get('/auth/bnet', passport.authenticate('bnet'));

 
app.get('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res){
        res.redirect('/');
    });



    async function getList (){
    const response = await fetch(`/auth/bnet/profile/user/wow`);
    console.log(response)
    }

    
  getList();