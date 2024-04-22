const LocalStrategy = require("passport-local").Strategy;
const db = require('./db');
const bCrypt = require('bcrypt')

//J'ai pris les input qui sont dans mon formulaire et je les compare avec les donnée dans ma BDD
//il faut maintenant que je récupere le type d'utilisateur envoyer a chaque reqûete que mon client fais
//ce type d'utilisateur s'envois automatiquement dans le corp de ma requête lors que mon formulaire est envoyé
// je dois définir un type d'utilisateur global pour ma stratégie
//ou j'enregisterer les donnée de usertype fournis a chaque requête de mon formulaire 
//je dois prendre les valeur dans le corp de ma reqûete.
//enrigistrer ces valeur dans mon argument
//faire différent cas d'utilisation lorsque la valeur de l'user change selon mon fomulaire
//enregistrer alors cette valeur dans ma global
//ensuite utiliser cette global pour faire un appelle dans ma BDD selon les différent cas de figure

let userType;

async function initializePassport(passport) {
  const authUser = async (email, password, formUserType, done) => {
    try {
      switch (formUserType) {
        case 'recruteur':
          userType = 'recruteur';
          break;
      
        case 'user':
          userType = 'user';
          break;
      
        case 'admin':
          userType = 'admin';
          break;
      
        default:
          throw new Error('this user does not exist');
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
