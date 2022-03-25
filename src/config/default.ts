import { loadEnvVars } from '../infrastructure/environment'
loadEnvVars()
const config = {
  'environment': process.env.NODE_ENV,
  'port': process.env.RESTAPI_PORT,
  'version': process.env.RESTAPI_VERSION,
  'token': process.env.AUTH_TOKEN
}
export default config