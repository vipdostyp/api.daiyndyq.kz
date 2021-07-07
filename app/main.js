const express = require('express')
const app     = express()
const http    = require('http').Server(app);
const cors    = require('cors')

require('module-alias/register')

http.listen(4000, '0.0.0.0', () => {
    console.log('server has been started..')
})

app.use(express.json())
app.use(cors())

app.use('/account/', require('@app/routes/account'))
app.use('/posts', require('@app/routes/posts'))

app.use((req, res) => {
    res.status(404).json({status: false})
})