const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { username, password } = req.body
    if (password === process.env.PASSWORD) {
        const token = jwt.sign(
            { username },  
            process.env.JWT_SECRET, { expiresIn: '1d' }
        )
        return res.json({ token, username })
    } 
    else {
        return res.status(400).json({ error: "รหัสผ่านไม่ถูกต้อง!" })
    }
}

exports.checkToken = (req, res, next) => {
    const token = req.body.token || req.headers['token'];
    if (!token) return res.status(401).send('Access Denied');

    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } 
    catch (err) {
        res.status(400).send('Invalid Token');
    }
};







