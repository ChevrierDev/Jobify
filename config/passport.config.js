const LocalStrategy = require("passport-local").Strategy;
const db = require('./db');
const bCrypt = require('bcrypt')



let userType;

async function initializePassport(passport) {
  const authUser = async (email, password, formUserType, done) => {
    try {
      switch (formUserType) {
        case 'recruteur':
          userType = 'recruteur';
          break;
      
        case 'users':
          userType = 'users';
          break;
      
        case 'admins':
          userType = 'admins';
          break;
      
        default:
          throw new Error('this user type does not exist');
          break;
      }
      
      const query = `SELECT * FROM ${userType} WHERE email = $1`; 
      const { rows } = await db.query(query, [email]);
      const user = rows[0];
      
      if (!user) {
        return done(null, false, { message: "Incorrect email address" });
      }
      const passwordMatched = await bCrypt.compare(password, user.mot_de_passe);
      if (!passwordMatched) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      done(error); 
    }
  };

  passport.use(new LocalStrategy({ 
    usernameField: "email",
    passReqToCallback: true
  }, async (req, email, password, done) => {

    await authUser(email, password, req.body.userType, done)
  }));

  passport.serializeUser((user, done) => {
    done(null, user.recruteur_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const query = `SELECT * FROM ${userType} WHERE ${userType}_id = $1`;
      const { rows } = await db.query(query, [id]);
      const user = rows[0];
      if (!user) {
        return done(new Error('User not found'));
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initializePassport;
