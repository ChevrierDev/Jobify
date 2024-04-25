const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
const bCrypt = require("bcrypt");

async function initializePassport(passport) {
  async function authUser(email, password, formUserType, done) {
    try {
      let userType;
      switch (formUserType) {
        case "recruteur":
          userType = "recruteur";
          break;
        case "users":
          userType = "users";
          break;
        case "admin":
          userType = "admin";
          break;
        default:
          throw new Error("this user type does not exist");
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
      
      user.userType = userType;
      return done(null, user, userType);
    } catch (error) {
      done(error);
    }
  }

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        await authUser(email, password, req.body.userType, done);
      }
    )
  );

  passport.serializeUser((user, done) => {
    let userId;
    let userType;
    switch (user.userType) {
      case "recruteur":
        userId = user.recruteur_id;
        userType = 'recruteur';
        break;
      case "users":
        userId = user.users_id;
        userType = 'users';
        break;
      case "admin":
        userId = user.admin_id;
        userType = 'admin';
        break;
      default:
        return done(new Error("Unknown user type"));
    }
   
    done(null, { id: userId, type: userType });
    console.log('usertypeSerialize:', userType);
  });

  passport.deserializeUser(async (idObj, done) => {
    try {
      const { id, type } = idObj;
      let userType;
      switch (type) {
        case "recruteur":
          userType = "recruteur";
          break;
        case "users":
          userType = "users";
          break;
        case "admin":
          userType = "admin";
          break;
        default:
          return done(new Error("Unknown user type"));
      }
      
      console.log('usertypeDeserialize:', userType);
      const query = `SELECT * FROM ${userType} WHERE ${userType}_id = $1`;
      const { rows } = await db.query(query, [id]);
      const user = rows[0];
      
      if (!user) {
        return done(new Error("User not found"));
      }

      done(null, user);
      console.log(user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initializePassport;
