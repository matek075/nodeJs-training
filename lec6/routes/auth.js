const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const router = express.Router()

router.post('/register', async (req, res) => {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ email, password: hashedPassword })
    res.status(201).json({ message: 'User created' })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)
    res.json({ token })
})

router.get('/me', require('../middleware/auth'), async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'email']
    })
    res.json(user)
})

module.exports = router
