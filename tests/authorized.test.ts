process.env.NODE_ENV = 'testing'
process.env.RESTAPI_PORT = '4000'
import { loadEnvVars } from '../src/infrastructure/environment'
loadEnvVars()

import request from 'supertest'
import { expect } from 'chai'
import { server } from './testSupport/server'

const UNAUTHORIZED_STATUS = 401

describe('Authorization', () => {
    const body = {
        title: 'Title - Upload File',
        description: 'First file description',
        wallet: 'CAUSE-WALLET',
        imageUrl:
            'https://educowebmedia.blob.core.windows.net/educowebmedia/educospain/media/images/blog/ong-y-ods.jpg',
    }
    it('avoid access without token', async () => {
        const response = await request(server)
            .post(`/api/${process.env.RESTAPI_VERSION}/causes`)
            .send(body)
        expect(response.statusCode).to.eq(UNAUTHORIZED_STATUS)
        expect(response.body.status).to.eq('ko')
        expect(response.body.message).to.eq('You cannot access to server')
        expect(response.body.code).to.eq(UNAUTHORIZED_STATUS)
        expect(Boolean(response.body.stack)).to.be.true
    })
})