import path from 'path'

const environmentVariablesToAssert = () :void => {
  assertVariable(process.env.NODE_ENV, 'NODE_ENV')
  assertVariable(process.env.RESTAPI_PORT, 'RESTAPI_PORT')
  assertVariable(process.env.RESTAPI_VERSION, 'RESTAPI_VERSION')
  assertVariable(process.env.SQLITE_DATABASE, 'SQLITE_DATABASE')
  assertVariable(process.env.MIN_CAUSE_PROFIT_PERCENTAJE, 'MIN_CAUSE_PROFIT_PERCENTAJE')
  assertVariable(process.env.MARKETPLACE_PROFIT_PERCENTAJE, 'MARKETPLACE_PROFIT_PERCENTAJE')
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

const assertVariable = (variable: string | undefined, name: string) => {
  if (variable == null) {
    throw new Error(`Variable ${name} is undefined!`)
  }
  if (variable.trim() === "") {
    throw new Error(`Variable ${name} is empty!`)
  }
}

export {
  loadEnvVars
}