import { Service } from 'typedi'
import { Connection, createConnection } from 'typeorm'
import Cause from '../domain/model/Cause'

@Service()
export default class SqliteConnection {
  async connect(database: string): Promise<Connection> {
    return await createConnection({
      type: 'sqlite',
      database,
      entities: [Cause],
      synchronize: true,
    })
  }
}