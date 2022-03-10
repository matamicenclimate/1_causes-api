import assert from 'assert'
import path from 'path'

const environmentVariablesToAssert = () :void => {
  assertVariable(process.env.NODE_ENV, 'NODE_ENV')
  assertVariable(process.env.RESTAPI_PORT, 'RESTAPI_PORT')
  assertVariable(process.env.RESTAPI_VERSION, 'RESTAPI_VERSION')
  assertVariable(process.env.SQLITE_DATABASE, 'SQLITE_DATABASE')
}

const checkEnvVars = () :void => {
  try {
    environmentVariablesToAssert()
  } catch (error) {
    throw new Error(error.message)
  }
}

const loadEnvVars = () :void => {
  const location = path.join(__dirname, '/../../.env')
  require('dotenv').config({ path: location })

  checkEnvVars()
}

const assertVariable = (variable:string, name:string) => {
  if (variable === undefined) {
    throw new Error(`Variable ${name} is undefined!`)
  }
  if (variable === "") {
    throw new Error(`Variable ${name} is empty!`)
  }
}

export {
  loadEnvVars
}