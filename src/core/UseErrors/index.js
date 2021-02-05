import { ErrorDefinitionHandler } from './ErrorDefinitionHandler'


const UseErrors = () => {
  return {
    Err: (...errConfig) => ErrorDefinitionHandler(errConfig)
  }
}


export default UseErrors
