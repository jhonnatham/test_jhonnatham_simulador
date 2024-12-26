const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5500

const permiss = require('./middleware/validation.middleware')

// process request format json
app.use(express.json())
app.use(cors())

// middleware permisos
app.use(permiss)

//router
const simulaciones = require('./router/simulaciones.routes')
const users = require('./router/users.routes')

app.use('/api/simulaciones', simulaciones)
app.use('/api/users', users)

// default test response
app.get('/', function (req, res) {
  res.send('API activa')
})

// execute  server
app.listen(port, () => console.log(`Conectado al puerto ${port}`))