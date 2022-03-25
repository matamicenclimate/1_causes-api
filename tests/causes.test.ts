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
  beforeEach(async () => {
    await db
  })
  afterEach(async () => {
    const connection = await db
    connection.createQueryBuilder().delete().from(Cause).execute()
  })

  const body = {
    title: 'Title - Upload File',
    description: 'First file description',
    wallet: 'CAUSE-WALLET',
    imageUrl:
      'https://educowebmedia.blob.core.windows.net/educowebmedia/educospain/media/images/blog/ong-y-ods.jpg',
  }
  const postEntity = (b = body) =>
    request(server).post(`/api/${process.env.RESTAPI_VERSION}/causes`).send(b)
  const body_update = {
    title: 'Title - Upload File - updated',
    description: 'First file description - updated',
    wallet: 'CAUSE-WALLET',
    newWallet: 'CAUSE-WALLET - updated',
    imageUrl:
      'https://www.guiadisc.com/wp-content/uploads/constitucion-legal-ong-peru.jpg',
  }

  it('Can be created', async () => {
    const response = await postEntity(body)
    expect(response.statusCode).to.eq(SUCCESS)
    expect(response.body.title).to.eq(body.title)
    expect(response.body.description).to.eq(body.description)
    expect(response.body.imageUrl).to.eq(body.imageUrl)
  })
  it('Can be listed', async () => {
    const postResponse = await postEntity()
    expect(postResponse.statusCode).to.eq(SUCCESS)
    const response = await request(server).get(
      `/api/${process.env.RESTAPI_VERSION}/causes`
    )
    expect(response.statusCode).to.eq(SUCCESS)
    expect(response.body[0].title).to.eq(body.title)
    expect(response.body[0].description).to.eq(body.description)
    expect(response.body[0].imageUrl).to.eq(body.imageUrl)
  })
  it('Find One', async () => {
    const postResponse = await postEntity(body)
    expect(postResponse.statusCode).to.eq(SUCCESS)
    const response = await request(server).get(
      `/api/${process.env.RESTAPI_VERSION}/causes/${body.wallet}`
    )
    expect(response.statusCode).to.eq(SUCCESS)
    expect(response.body.title).to.eq(body.title)
    expect(response.body.description).to.eq(body.description)
    expect(response.body.imageUrl).to.eq(body.imageUrl)
  })
  it('Can be Updated', async () => {
    const postResponse = await postEntity(body)
    expect(postResponse.statusCode).to.eq(SUCCESS)
    const putResponse = await request(server)
      .put(`/api/${process.env.RESTAPI_VERSION}/causes`)
      .send(body_update)
    expect(putResponse.statusCode).to.eq(SUCCESS)
    const response = await request(server).get(
      `/api/${process.env.RESTAPI_VERSION}/causes/${body_update.newWallet}`
    )
    expect(response.statusCode).to.eq(SUCCESS)
    expect(response.body.title).to.eq(body_update.title)
    expect(response.body.description).to.eq(body_update.description)
    expect(response.body.imageUrl).to.eq(body_update.imageUrl)
  })
  it('Can be Deleted', async () => {
    const postResponse = await postEntity(body)
    expect(postResponse.statusCode).to.eq(SUCCESS)
    const deleteResponse = await request(server).delete(
      `/api/${process.env.RESTAPI_VERSION}/causes/${body.wallet}`
    )
    expect(deleteResponse.statusCode).to.eq(SUCCESS)
    const findResponse = await request(server).get(
      `/api/${process.env.RESTAPI_VERSION}/causes/${body.wallet}`
    )
    expect(findResponse.statusCode).to.eq(SUCCESS)
    expect(findResponse.body).to.be.empty
  })
})
