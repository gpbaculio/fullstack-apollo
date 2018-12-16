import express from "express";
import { User } from '../models'
import { sendConfirmationEmail } from '../mailer'

const router = express.Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
        res.json({ error: 'Email already used' })
    } else {
        const newUser = new User({ email })
        newUser.setPassword(password)
        newUser.setConfirmationToken()
        newUser
            .save()
            .then(userRecord => {
                sendConfirmationEmail(userRecord)
                res.json({ email: userRecord.email, error: null })
            })
    }
})

export default router