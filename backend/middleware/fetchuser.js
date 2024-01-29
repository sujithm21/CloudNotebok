var jwt = require('jsonwebtoken');
const JWT_SECRET = "sujithmakam$joshnareddy"

const fetchuser = (req, res, next) => {

    //get user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(400).send({error : 'please authenticate using a valid token'});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        return res.status(400).send({error : 'please authenticate using a valid token'});
    }
}

module.exports = fetchuser;