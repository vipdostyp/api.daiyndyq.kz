const Pool = require('pg').Pool

const pool = new Pool({

    user: 'postgres',

    password: 'isko2003',

    host: 'daiyndyq.kz',

    port: 5432,

    database: 'daiyndyq_kz'

})

module.exports = pool