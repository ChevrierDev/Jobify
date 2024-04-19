const passport = require("passport");
const bCrypt = require("bcrypt");
const localStrategy = require("passport-local");
const db = require("../config/db");

const {
  body,
  validationResult,
} = require("express-validator");

//recruter Auhtentification Rule
const recruterAuthValidationRule = () => {
  return [
    body("nom_entreprise").notEmpty().isString().trim(),
    body("email").notEmpty().isEmail().trim(),
    body("mot_de_passe").notEmpty().isString().trim(),
  ];
};

//handle validation error middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({
      errors: errors.array({
        onlyFirstError: true,
      }),
    });
  }
};

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

//User Authentification
async function userGetAuth(req, res) {
  res.render("auth/login", {
    title: "Connectez vous.",
  });
}

//recruter render Authentification
async function recruterGetAuth(req, res) {
  res.render("auth/recruter/recruter_login", {
    title: "Connectez vous en tant que recruteur.",
  });
}

//render recruter page
async function recruterGetRegister(req, res) {
  res.render("auth/recruter/recruter_register", {
    title: "Créer un compte recruteur",
  });
}

//post new recruter
async function postNewRecruterAuth(req, res) {
  try {
    const { nom_entreprise, email, mot_de_passe } = req.body;

    const hashedPassword = await cryptPassword(mot_de_passe);

    const newRecruter = await db.query(
      "INSERT INTO public.recruteur(nom_entreprise, email, mot_de_passe, date_de_creation) VALUES ($1, $2, $3, CURRENT_DATE)",
      [nom_entreprise, email, hashedPassword]
    );

    console.log("New recruter:", newRecruter);

    res
      .status(200)
      .send("New recruter added with succes")
      .json(newRecruter.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).send("Internal server error !");
  }
}

module.exports = {
  userGetAuth,
  recruterGetAuth,
  recruterGetRegister,
  postNewRecruterAuth,
  recruterAuthValidationRule,
  validate,
};
