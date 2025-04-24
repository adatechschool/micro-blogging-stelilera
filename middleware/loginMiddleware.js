import jwt from 'jsonwebtoken';

export const loginCheck = (req, res, next) => {
    if (!req.session.user) { 
        console.log("Session utilisateur non définie !");
        return res.redirect('/login'); 
    }
    
    const token = req.session.user.token
    
    if (!token) {
        console.log("err")
        return res.redirect('/login')
    };

    jwt.verify(token, "your-secret-token", (err, decoded) => {
        if (err) {
            console.log('err :', err)
            return res.redirect('/login')
        }    
        req.user = decoded
        next()
    });
};

export default loginCheck;