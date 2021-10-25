const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors({
  origin: '*'
}));
app.use((request, response, next) => {
  console.log(request.headers)
  next()
})
app.use((request, response, next) => {
  request.chance = Math.random()
  next()
})
app.get('/', (request, response) => {
  response.json({
      chance: request.chance
  })
})
app.use((err, request, response, next) => {
  // логирование ошибки, пока просто console.log
  console.log(err)
  response.status(500).send('Something broke!')
})
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
