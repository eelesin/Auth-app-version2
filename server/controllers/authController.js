const User = require('../models/User');

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

module.exports = {register}