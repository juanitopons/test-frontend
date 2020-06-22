const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'events.json'))
const middlewares = jsonServer.defaults()
const PORT = 4000

server.use((req, res, next) => {
  delete req.query.start
  delete req.query.end
  next()
})

server.use(middlewares)
server.use(router)
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})
