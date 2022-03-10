process.env.NODE_ENV = 'testing'
process.env.RESTAPI_PORT = '4000'
import { loadEnvVars } from '../src/infrastructure/environment'
loadEnvVars()

import request from 'supertest'
import { expect } from 'chai'
import server from './testSupport/server'

const SUCCESS = 200

describe('causes', () => {
  const causeImagePath = __dirname + '/testSupport/ong-y-ods.jpeg'
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
      }).then(done).catch(done)

	})
})
