import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import toJson from '@meanie/mongoose-to-json'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmationToken: {
        type: String,
        default: ''
    }
},
    { timestamps: true })

UserSchema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.setPassword = function setPassword(password) {
    this.password = bcrypt.hashSync(password, 10)
}

UserSchema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        { id: this.id },
        process.env.JWT_SECRET,
    )
}

UserSchema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT()
}

UserSchema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${process.env.HOSTNAME || process.env.LOCALHOST}confirmation/${this.confirmationToken}`
}

UserSchema.methods.toAuthJSON = function toAuthJSON() {
    return {
        id: this.id,
        email: this.email,
        token: this.generateJWT(),
        confirmed: this.confirmed
    }
}

UserSchema.plugin(toJson)

export default mongoose.model('User', UserSchema)