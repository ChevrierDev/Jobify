async function getRecruterPage(req, res) {
    res.render('layouts/recruter_page', {
        title: 'Jobify pour recruteur'
    });
}

module.exports = getRecruterPage;