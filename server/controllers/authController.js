const User = require('../models/User');
const {signAccessToken, signRefreshToken } = require('../config/token');

const register = async(req, res, next)=> {
    try{
        const {name, email, password} = req.body;

        //check for duplicate email before attempting to save
        const existing = await User.findOne({ email});
        if(existing){
            return res.status(409).json({ message: "Email already exist" })
        }

        // Create user - password hashing happens in the pre-save hook
        const user = await User.create({name, email, password});

        //Never send password back even hashed password

        res.status(201).json({
            message: "Account Created Successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }catch(error){
        next(error); //passes to the global error handler in index.js
    }

};


const login = async(req, res, next) => {
    try{
        const { email, password} = req.body;

        //Must explicit;y select password - it has select: false on the model
        const user = await User.findOne({ email}).select('+password')

        if(!user) {
         return res.status(401).json({ message: "Invalid credentials"})
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials"})
        }

        // Build token payload - never put sensitive data in JWT
        const payload = { id: user._id, role: user.role };

        const accessToken = signAccessToken(payload)
        const refreshToken = signRefreshToken({ id: user._id})

        // Refresh token goes in an httpOnly cookie - JS cannot read this
        res.cookie('refreshToken', signRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //HTTPS only in prod
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 1000,
        })

        res.status(200).json({
            accessToken,
            user:{
                 id: user._id,
                 name: user.name,
                 email: user.email,
                 role: user.role,
            }
           
        })

    }catch(error){ 
        next(error)
    }
}

module.exports = {register, login}