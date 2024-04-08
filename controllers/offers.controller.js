const db = require("../config/db");

//get all offer from DB
async function getOffer(req, res) {
  try {
    const results = await db.query("SELECT * FROM offres");
    res.json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//Post new offer to DB
async function postNewOffer(req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Missing required field");
    }

    const {
      titre,
      description,
      entreprise,
      lieu,
      date_limite,
      type_contrat,
      salaire,
      experience,
      diplome_requis,
      competences,
    } = req.body;

    const newPost = await db.query(
      "INSERT INTO public.offres(titre, description, entreprise, lieu, date_publication, date_limite, type_contrat, salaire, experience, diplome_requis, competences, created_at, updated_at) VALUES ($1, $2, $3, $4, CURRENT_DATE, $5::DATE, $6, $7, $8, $9, $10, NOW(), NOW())",
      [
        titre,
        description,
        entreprise,
        lieu,
        date_limite,
        type_contrat,
        salaire,
        experience,
        diplome_requis,
        competences,
      ]
    );

    res.status(200).send("offer add with success").json(newPost.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
}

//Delete offer from DB by is ID
async function deleteOffer(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(404).send("You must enter a valid ID");
      return;
    }

    const deleteOffer = await db.query(
      `DELETE FROM public.offres WHERE id = ${id}`
    );

    if (deleteOffer.rowCount === 0) {
      res.status(404).send("No offer found with the provided ID");
      return;
    }

    res.status(200).send("Succesfully deleted").json(deleteOffer.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error happen cannot delete current offer");
  }
}

//Update offer from DB by is ID
async function updateOffer(req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Missing required field");
    }

    const {
      id,
      titre,
      description,
      entreprise,
      lieu,
      date_limite,
      type_contrat,
      salaire,
      experience,
      diplome_requis,
      competences,
    } = req.body;

    const updateOffer = await db.query(
      `UPDATE public.offres SET titre=$1, description=$2, entreprise=$3, lieu=$4, date_limite=$5, type_contrat=$6, salaire=$7, experience=$8, diplome_requis=$9, competences=$10, updated_at=NOW() WHERE id=${id}`,
      [
        titre,
        description,
        entreprise,
        lieu,
        date_limite,
        type_contrat,
        salaire,
        experience,
        diplome_requis,
        competences,
      ]
    );

    if (updateOffer.rowCount === 0) {
      res.status(404).send("No offer found with the provided ID");
      return;
    }

    res.status(200).send("offer has been updated").json(updateOffer.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server Error Update offer is not possible");
  }
}

module.exports = {
  getOffer,
  postNewOffer,
  deleteOffer,
  updateOffer,
};
