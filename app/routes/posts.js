const express = require('express')
const router  = express.Router()

router.get('/', require('@app/controllers/posts/get'))

module.exports = router