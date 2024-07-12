const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    try {
         
        const authHeader =req.headers.authorization
        if(!authHeader){
            return res.status(401).json({error:"Unauthorized"})
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SecretKey);

        req.user = decoded
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "invalid token" });
    }

}

//function to generate tokens 
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SecretKey, { expiresIn: 300 })
}

module.exports = { jwtAuthMiddleware, generateToken }