import './InjectContainers'
import Application from 'koa'
import Entry from 'ts-entry-point'
import { useKoaServer } from 'routing-controllers'
import { handleErrors } from './middlewares/handleErrors'
import config from './config/default'
import { cors } from './middlewares/cors'
import Connection from './services/Connection'
import Container from 'typedi'
import { ui } from 'swagger2-koa'
import * as swagger from 'swagger2'
import CustomLogger from './infrastructure/CustomLogger'

@Entry
export default class Main {
  static async main(args: string[]) {
    const { app } = await this.setup()
    app.listen(this.port, this.done)
    return app
  }

  static readonly port = config.port

  private static done() {
    const logger = new CustomLogger()
    logger.info(`Listening on port ${Main.port}!`)
  }
  
  static setup() {
    // const swaggerDocument: any = swagger.loadDocumentSync('./src/public/api.yaml');
    const connectionService = Container.get(Connection)
    const connection = connectionService.connect(`${process.env.NODE_ENV}-${process.env.SQLITE_DATABASE}`)
    const app = new Application()
    app.use(handleErrors)
    app.use(cors)
    // app.use(ui(swaggerDocument, '/api/v1/docs'))

    useKoaServer(app, {
      cors: true,
      defaultErrorHandler: false,
      controllers: [`${__dirname}/controllers/*.ts`],
    })
    return { app, connection }
  }
}
