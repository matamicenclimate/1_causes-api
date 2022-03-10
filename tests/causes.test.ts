process.env.NODE_ENV = 'testing'
process.env.RESTAPI_PORT = '4000'
import fs from 'fs'
import { loadEnvVars } from '../src/infrastructure/environment'
loadEnvVars()

import request from 'supertest'
import { expect } from 'chai'
import server from './testSupport/server'
import Connection from '../src/services/Connection'
import Container from 'typedi'
import Cause from '../src/domain/model/Cause'

const SUCCESS = 200

describe('causes', () => {
  beforeEach(async ()=> {
    const connectionService = Container.get(Connection)
    const connection = await connectionService
      .connect(`${process.env.NODE_ENV}-${process.env.SQLITE_DATABASE}`)
    connection.createQueryBuilder()
    .delete()
    .from(Cause)
    .execute();
  })
  const body = {
    title: 'Title - Upload File',
    description: 'First file description',
    wallet: 'CAUSE-WALLET',
    imageUrl: 'https://educowebmedia.blob.core.windows.net/educowebmedia/educospain/media/images/blog/ong-y-ods.jpg'
  }

	it('Can be created', (done) => {
		const response = request(server)
			.post(`/api/${process.env.RESTAPI_VERSION}/causes`)
      .send(body)
      .then(response => {
        expect(response.statusCode).to.eq(SUCCESS)
        expect(response.body.value.title).to.eq(body.title)
        expect(response.body.value.description).to.eq(body.description)
        expect(response.body.value.imageUrl).to.eq(body.imageUrl)
        expect(Boolean(response.body.value.date)).to.be.true
      }).then(done).catch(done)

	})
})
