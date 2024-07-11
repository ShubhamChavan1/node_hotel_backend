const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const person = require('./models/person');

passport.use(new localStrategy(async (USERNAME, PASSWORD, done) => {
    try {
         const user = await person.findOne({ username: USERNAME });

         if (!user) {
              return done(null, false, { message: "User not found" });
         }

         const isPassword = user.comparepassword(PASSWORD) //take password from user

         if (isPassword) {
              return done(null, user);
         } else {
              return done(null, false, { message: "Password does not match" });
         }
    } catch (error) {
         return done(error);
    }
}));

module.exports = passport;