const passport = require("passport");
const bCrypt = require("bcrypt");
const localStrategy = require("passport-local");
const db = require("../config/db");

const { body, validationResult } = require("express-validator");

//recruter Auhtentification Rule
const recruterAuthValidationRule = () => {
  return [
    body("nom_entreprise")
      .notEmpty()
      .withMessage("You must enter a name for your companies")
      .isString()
      .trim(),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("This is not a valid email adress")
      .trim()
      .custom(async (value, { req }) => {
        const query =
          "SELECT EXISTS (SELECT 1 FROM recruteur WHERE email = $1) AS email_exists";
        const result = await db.query(query, [value]);
        const { email_exists } = result.rows[0];

        if (email_exists) {
          throw new Error("This email address is already registered.");
        }
      })
      .withMessage("User already exist"),
    body("mot_de_passe")
      .notEmpty()
      .withMessage("You must enter a Password")
      .isString()
      .trim()
      .isLength({ min: 10, max: 40 })
      .withMessage("Your Password need a minimum of 10 charaters")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/)
      .withMessage("Your password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 10 characters long."),
    body("confirm_pass")
      .notEmpty()
      .withMessage("You must confirm your password")
      .custom((value, { req }) => {
        return value === req.body.mot_de_passe;
      })
      .withMessage("Passwords do not match"),
  ];
};

//handle validation error middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(400).json({
      errors: extractedErrors,
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
      .send("New recruter added with succes !")
      .json(newRecruter.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).send("Internal server error !");
  }
}

module.exports = {
  postNewRecruterAuth,
  recruterAuthValidationRule,
  validate,
};
