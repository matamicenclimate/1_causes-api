process.env.NODE_ENV = 'testing'
process.env.RESTAPI_PORT = '4000'
import { loadEnvVars } from '../src/infrastructure/environment'
loadEnvVars()

import request from 'supertest'
import { expect } from 'chai'
import { server, db } from './testSupport/server'
import Cause from '../src/domain/model/Cause'

const SUCCESS = 200

describe('causes', () => {
  beforeEach(async ()=> {
    await db
  })
  afterEach(async ()=> {
    const connection = await db
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
		request(server)
			.post(`/api/${process.env.RESTAPI_VERSION}/causes`)
      .send(body)
      .then(response => {
        expect(response.statusCode).to.eq(SUCCESS)
        expect(response.body.title).to.eq(body.title)
        expect(response.body.description).to.eq(body.description)
        expect(response.body.imageUrl).to.eq(body.imageUrl)
      }).then(done).catch(done)

	})
  it('Can be listed', (done) => {
    request(server)
			.post(`/api/${process.env.RESTAPI_VERSION}/causes`)
      .send(body)
      .then((result) => {
        expect(result.statusCode).to.eq(SUCCESS)
        request(server)
          .get(`/api/${process.env.RESTAPI_VERSION}/causes`)
          .then(response => {
            expect(response.statusCode).to.eq(SUCCESS)
            expect(response.body[0].title).to.eq(body.title)
            expect(response.body[0].description).to.eq(body.description)
            expect(response.body[0].imageUrl).to.eq(body.imageUrl)
          }).then(done).catch(done)
      })
	})
  it('Find One', (done) => {
    const wallet = 'CAUSE-WALLET'
    request(server)
			.post(`/api/${process.env.RESTAPI_VERSION}/causes`)
      .send(body)
      .then((result) => {
        expect(result.statusCode).to.eq(SUCCESS)
        request(server)
          .get(`/api/${process.env.RESTAPI_VERSION}/causes/${wallet}`)
          .then(response => {
            expect(response.statusCode).to.eq(SUCCESS)
            expect(response.body.title).to.eq(body.title)
            expect(response.body.description).to.eq(body.description)
            expect(response.body.imageUrl).to.eq(body.imageUrl)
          }).then(done).catch(done)
      })
	})
})