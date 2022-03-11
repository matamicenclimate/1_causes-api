import './InjectContainers'
import Application from 'koa'
import { useKoaServer } from 'routing-controllers'
import { handleErrors } from './middlewares/handleErrors'
import { cors } from './middlewares/cors'
import Connection from './services/Connection'
import Container from 'typedi'
import { ui } from 'swagger2-koa'
import * as swagger from 'swagger2'

export default class Server {
  static setup () {
    const swaggerDocument: any = swagger.loadDocumentSync('./src/public/api.yaml');
    const connectionService = Container.get(Connection)
    const connection = connectionService.connect(`${process.env.NODE_ENV}-${process.env.SQLITE_DATABASE}`)
    const app = new Application()
    app.use(handleErrors)
    app.use(cors)
    app.use(ui(swaggerDocument, '/api/v1/docs'))

    useKoaServer(app, {
      cors: true,
      defaultErrorHandler: false,
      controllers: [`${__dirname}/controllers/*.ts`],
    })
    return { app, connection }
  }
}