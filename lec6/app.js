const express = require('express')
const sequelize = require('./sequelize')
const authRoutes = require('./routes/auth')
const User = require('./models/User')

const app = express()
app.use(express.json())

app.use('/api', authRoutes)

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})
