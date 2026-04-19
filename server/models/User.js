const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, 'name required'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true, 
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/,
        'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false, //never return in queries by deafult
    },
    role: {
        type: String, 
        enum: ['user', 'admin'],
        default: 'user',
    },
}, 
{
    timestamps: true,   // adds createdAT and updatedAT automatically
}
)

// --Hash Password Before Savings --
//-- Only runs if password field was modified - prevents re-hashing on other updates

userSchema.pre('save', async function () {
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
    
});

// ── Instance method: compare passwords at login ──
// We put this on the model so the controller stays clean
userSchema.methods.comparePassword = async function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports =  mongoose.model('User', userSchema) 