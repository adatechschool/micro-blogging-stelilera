import jwt from 'jsonwebtoken';

export const loginCheck = (req, res, next) => {
    console.log('login check')
    if(!req.session.user){
        console.log("err user undefined")
        return res.redirect('/login')
    }

    const token = req.session.user.token
    
    if (!token) {
        console.log("err token undefined")
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