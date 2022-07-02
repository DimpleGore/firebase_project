const firebase = require('../Controller/database')
exports.authenticate = async (req, res, next) => {

    try {
        const token = req.headers["authorization"];

        if (!token) return res.status(400).json({ msg: " Token Not Found " });

        firebase.auth()
            .verifyIdToken(token)
            .then((claims) => {
                console.log(claims)
                next()

            }).catch(err => {
                return res.status(400).json({ msg: "Invalidate Authentication" });
            });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
