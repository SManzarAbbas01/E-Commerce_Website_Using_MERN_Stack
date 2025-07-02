import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Not Authorized, no token provided.' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // *** FIX: Attach userId directly to the request object, not the body ***
        // GET requests don't have a body, so req.body can be undefined.
        req.userId = token_decode.id;
        
        next(); // Pass control to the next handler
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Authentication failed, token is invalid or expired." });
    }
};

export default authUser;
