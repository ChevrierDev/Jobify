//User Authentification
async function userGetAuth(req, res) {
res.render('auth/login',{
    title: "Connectez vous."
});
};


//recruter Authentification
async function recruterGetAuth(req, res) {
    res.render('auth/recruter/recruter_login',{
        title: "Connectez vous en tant que recruteur."
    });
};

async function recruterGetRegister(req, res) {
    res.render('auth/recruter/recruter_register', {
        title: "Créer un compte recruteur",
    });
};


module.exports = {
    userGetAuth,
    recruterGetAuth,
    recruterGetRegister
};
