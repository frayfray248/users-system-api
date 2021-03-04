const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    (async () => {
        try {
            
            // get auth token
            const token = req.headers.authorization.split(' ')[1];
        
            // verify token
            const decoded = JWT.verify(token, process.env.JWT_KEY);

            // save user information
            req.userData = decoded

            next();

        } catch(error) {

            // log error
            console.log(error.message)

            // auth failed
            res.status(401).json({
                message: 'Authorization failed'
            })
        }
    })();
}