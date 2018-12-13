import express from 'express'
import { User } from '../models'

const router = express.Router()

router.post('/', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email })
        .then(user => {
            if (user && user.isValidPassword(password)) {
                res.status(200).json({ user: user.toAuthJSON() })
            } else {
                res.status(400).json({ error: 'Invalid Credentials' })
            }
        })
})

router.post('/confirmation', (req, res) => {
    const { token } = req.body
    User.findOneAndUpdate(
        { confirmationToken: token },
        { confirmationToken: '', confirmed: true },
        { new: true }
    ).then(user =>
        user ? res.json({ user: { email: user.email } }) :
            res.status(400).json({ error: 'Invalid Token' }) // error response as for token must be invalid
    )
})

export default router