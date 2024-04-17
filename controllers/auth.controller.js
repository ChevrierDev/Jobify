async function getAuth(req, res) {
res.render('auth/login')
};

async function recruterGetAuth(req, res) {
    res.render('auth/recruter/recruter_login')
    };

module.exports = {
    getAuth,
    recruterGetAuth
}
