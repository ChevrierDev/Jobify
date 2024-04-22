const LocalStrategy = require("passport-local").Strategy;
const db = require('./db');
const bCrypt = require('bcrypt')

async function initializePassport(passport) {
  const authUser = async (email, password, done) => {
    try {
      
      const query = `SELECT * FROM recruteur WHERE email = $1`; 
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

  passport.use(new LocalStrategy({ usernameField: "email" }, authUser));

  passport.serializeUser((user, done) => {
    done(null, user.recruteur_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const query = `SELECT * FROM recruteur WHERE recruteur_id = $1`;
      const { rows } = await db.query(query, [id]);
      const user = rows[0];
      if (!user) {
        return done(new Error('User not found'));
      }
      done(null, user);
      console.log('user ---------->',user)
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initializePassport;
