const { body, validationResult } = require("express-validator");

//recruter Auhtentification Rule
const recruterAuthValidationRule = () => {
  return [
    body("nom_entreprise")
      .notEmpty()
      .withMessage("You must enter a name for your companies")
      .isString(),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("This is not a valid email adress")
      .trim()
      .custom(async (value, { req }) => {
        // custom validation that look if email already register in the DB
        const query =
          "SELECT EXISTS (SELECT 1 FROM recruteur WHERE email = $1) AS email_exists";
        const result = await db.query(query, [value]);
        const { email_exists } = result.rows[0];

        if (email_exists) {
          throw new Error("This email address is already registered.");
        }
      })
      .withMessage("User with this adress already exist"),
    body("mot_de_passe")
      .notEmpty()
      .withMessage("You must enter a Password")
      .isString()
      .trim()
      .isLength({ min: 10, max: 40 })
      .withMessage("Your Password need a minimums of 10 charaters")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/) //regex that fordify password
      .withMessage(
        "Your password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 10 characters long."
      ),
    body("confirm_pass")
      .notEmpty()
      .withMessage("You must confirm your password")
      .custom((value, { req }) => {
        return value === req.body.mot_de_passe;
      })
      .withMessage("Passwords do not match"),
    body("numero_siret")
      .optional()
      .notEmpty()
      .isNumeric({ min: 14, max: 14 })
      .withMessage("must contain 14 digits"),
    body("numero_telephone")
      .optional()
      .notEmpty()
      .isMobilePhone("fr-FR", { strictMode: true })
      .withMessage("incorrect phone number"),
    body("adresse").optional().notEmpty().isString(),
    body("pseudonyme")
      .optional()
      .notEmpty()
      .withMessage("Pseudonyme is required")
      .isString()
      .withMessage("Pseudonyme must be a string")
      .matches(/\d+/) //Regex that force username to have at least one int
      .withMessage("Pseudonyme must contain at least one integer")
      .isLength({ min: 8, max: 15 })
      .withMessage("Pseudonyme must be between 8 and 15 characters long")
      .custom(async (value) => {
        // look if the username already exist in the database
        const query =
          "SELECT EXISTS (SELECT 1 FROM recruteur WHERE pseudonyme = $1) AS pseudonyme_exists";
        const results = await db.query(query, [value]);
        const { pseudonyme_exists } = results.rows[0];

        if (pseudonyme_exists) {
          throw new Error("This username already exists.");
        }
      })
      .withMessage("Username already exists"),
  ];
};

//user Auhtentification Rules features
const userAuthValidationRule = () => {
  return [
    body("users_firstname")
      .notEmpty()
      .withMessage("You must enter your first name")
      .isString()
      .withMessage("Your first name must be a string")
      .trim(),
    body("users_lastname")
      .notEmpty()
      .withMessage("You must enter your last name")
      .isString()
      .withMessage("Your last name must be a string")
      .trim(),
    body("email")
      .notEmpty()
      .withMessage("You must enter your email")
      .isEmail()
      .withMessage("You must enter a correct email adress")
      .trim(),
    body("mot_de_passe")
      .notEmpty()
      .withMessage("You must enter a password")
      .isLength({ min: 10, max: 40 })
      .withMessage("Your Password need a minimums of 10 charaters")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/)
      .withMessage(
        "Your password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 10 characters long."
      )
      .trim(),
    body("confirm_pass")
      .notEmpty()
      .withMessage("You must confirm your password")
      .custom((value, { req }) => {
        return value === req.body.mot_de_passe;
      })
      .withMessage("Passwords do not match"),
  ];
};

//user Auhtentification Rules features
const adminAuthValidationRule = () => {
  return [
    body("pseudonyme")
      .notEmpty()
      .withMessage("You must enter a pseudo")
      .isString()
      .withMessage("Your first name must be a string")
      .trim()
      .custom(async (value) => {
        // look if the username already exist in the database
        const query =
          "SELECT EXISTS (SELECT 1 FROM recruteur WHERE pseudonyme = $1) AS pseudonyme_exists";
        const results = await db.query(query, [value]);
        const { pseudonyme_exists } = results.rows[0];

        if (pseudonyme_exists) {
          throw new Error("This username already exists.");
        }
      })
      .withMessage("Username already exists"),
    body("email")
      .notEmpty()
      .withMessage("You must enter your email")
      .isEmail()
      .withMessage("You must enter a correct email adress")
      .trim()
      .custom(async (value, { req }) => {
        const query =
          "SELECT EXISTS (SELECT 1 FROM admin WHERE email = $1) AS email_exists";
        const result = await db.query(query, [value]);
        const { email_exists } = result.rows[0];

        if (email_exists) {
          throw new Error("This email address is already registered.");
        }
      })
      .withMessage("User with this adress already exist"),
    ,
    body("mot_de_passe")
      .notEmpty()
      .withMessage("You must enter a password")
      .isLength({ min: 10, max: 40 })
      .withMessage("Your Password need a minimums of 10 charaters")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/)
      .withMessage(
        "Your password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 10 characters long."
      )
      .trim(),
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
    const extractedErrors = {};
    errors.array().forEach((err) => {
      if (!extractedErrors[err.param]) {
        extractedErrors[err.param] = err.msg;
      }
    });

    return res.status(400).json({
      errors: extractedErrors,
    });
  }
};

module.exports = {
  recruterAuthValidationRule,
  userAuthValidationRule,
  adminAuthValidationRule,
  validate,
};
