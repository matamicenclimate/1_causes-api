process.env.NODE_ENV = 'testing'
process.env.RESTAPI_PORT = '4000'
import { Server } from 'node:http'
import { loadEnvVars } from '../../src/infrastructure/environment'
loadEnvVars()
import ServerManager from '../../src/Server'

let server: Server
let db
if (!server) {
  const { app, connection } = ServerManager.setup()
  db = connection
  server = app.listen(process.env.RESTAPI_PORT, () => {
    console.log('Server listening on port', process.env.RESTAPI_PORT)
  })
}
export { 
  server,
  db
}