async function userGetAuth(req, res) {
res.render('auth/login');
};

async function recruterGetAuth(req, res) {
    res.render('auth/recruter/recruter_login');
};

async function recruterGetRegister(req, res) {
    res.render('auth/recruter/recruter_register', {
        title: "Créer vous un compte recruteur",
    });
};


module.exports = {
    userGetAuth,
    recruterGetAuth,
    recruterGetRegister
};
