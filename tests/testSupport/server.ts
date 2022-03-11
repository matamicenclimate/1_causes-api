process.env.NODE_ENV = 'testing'
process.env.RESTAPI_PORT = '4000'
import { Server } from 'node:http'
import { loadEnvVars } from '../../src/infrastructure/environment'
loadEnvVars()
import Main from '../../src/Main'
let server: Server
let db
if (!server) {
  const { app, connection } = Main.setup()
  db = connection
  server = app.listen((err) => {
    if (err) console.log(err.message)
  })
}
export { 
  server,
  db
}