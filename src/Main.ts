import './InjectContainers'
import Entry from 'ts-entry-point'
import config from './config/default'
import CustomLogger from './infrastructure/CustomLogger'
import Server from './Server'

@Entry
export default class Main {
  static async main(args: string[]) {
    const { app, connection } = Server.setup()
    app.listen(this.port, this.done)
    return { app, connection }
  }

  static readonly port = config.port

  private static done() {
    const logger = new CustomLogger()
    logger.info(`Listening on port ${Main.port}!`)
  }
}
