const db = require('../config/db');

async function recruterGetoffer(req, res) {
    try {
        const recruterId = req.user.recruteur_id;

        const recruiterOffers = await db.query(`SELECT * FROM public.offres WHERE recruteur_id = ${recruterId}`);
        console.log(recruiterOffers)
        res.render("layouts/recruter/recruter_dashboard",  {
            title: "Votre tableau de bord",
            user: req.user,
            offers: recruiterOffers 
        });

    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error.')
    }
};

module.exports = {
    recruterGetoffer,
};
