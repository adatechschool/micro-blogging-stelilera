import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

export const authCheck = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token non fourni.' });
    };

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide.' });
        }    
        req.user = decoded
        next()
    });
};

// const authCheck = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1]
//     jwt.verify(token, SECRET, (err, user) => {
//         req.username = user
//         next()
//     })
// }

export default authCheck;
