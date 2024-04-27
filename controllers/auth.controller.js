const bCrypt = require("bcrypt");
const db = require("../config/db");



//hash password function
async function cryptPassword(password) {
  const saltRounds = 10;

  if (!password) {
    throw new Error("Password is required.");
  }
  try {
    const hash = await bCrypt.hash(password, saltRounds);
    console.log("hash:", hash);
    return hash;
  } catch (error) {
    console.error("Error while hashing password:", error.message);
    throw error;
  }
}

//post new recruter
async function postNewRecruterAuth(req, res) {
  try {
    const {
      nom_entreprise,
      email,
      mot_de_passe,
      confirm_pass,
      pseudonyme,
      numero_siret,
      numero_telephone,
      adresse,
    } = req.body;

    const hashedPassword = await cryptPassword(mot_de_passe);

    const newRecruter = await db.query(
      "INSERT INTO public.recruteur(pseudonyme, mot_de_passe, nom_entreprise, numero_siret, date_de_creation, email, numero_telephone, adresse) VALUES ($1, $2, $3, $4, CURRENT_DATE, $5, $6, $7)",
      [
        pseudonyme,
        hashedPassword,
        nom_entreprise,
        numero_siret,
        email,
        numero_telephone,
        adresse,
      ]
    );

    if (newRecruter.rows[0] === 0) {
      res.status(404).send("You must enter your information");
      return;
    }

    res.redirect("/login/recruter");
  } catch (err) {
    console.log(err);
    res.status(400).send("Internal server error !");
  }
}

//post new User feature
async function postNewUserAuth(req, res) {
  try {
    const {
      users_firstname,
      users_lastname,
      email,
      mot_de_passe,
      confirm_pass,
    } = req.body;

    const hashedPassword = await cryptPassword(mot_de_passe);

    const newUser = await db.query(
      "INSERT INTO public.users(users_firstname, users_lastname, email, mot_de_passe, date_creation) VALUES ($1, $2, $3, $4, CURRENT_DATE)",
      [users_firstname, users_lastname, email, hashedPassword]
    );

    if (newUser.rows[0] === 0) {
      res.status(404).send("You must enter your information");
      return;
    }

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.status(400).send("Internal server error !");
  }
}

module.exports = {
  postNewRecruterAuth,
  postNewUserAuth,
};
