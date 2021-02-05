import KindOf from 'kind-of'


const ErrorDefinitionHandler = (errConfigs, cb) => {
  let _argVals = errConfigs

  if(KindOf(_argVals) !== 'array') {
    let msg = `Expected arguments provided to return an itterable that resolves "typeof" === 'array' as Boolean value of true.
  Returned: ${KindOf(_argVals)}
  Recieved: ${_argVals}`
    let err = new Error(msg)
    throw err
  }

  if(KindOf(cb) !== 'function') {
  //   let msg = `Expected arguments provided to return an itterable that resolves "typeof" === 'array' as Boolean value of true.
  // Returned: ${KindOf(_argVals)}
  // Recieved: ${_argVals}`
  //   let err = new Error(msg)
  //   throw err
  cb = (_e) => _e
  console.log(_argVals)
  }

  console.log(cb)

  let _cb = cb('Hello world')

  console.log(_cb)

  return _argVals
}


export {
  ErrorDefinitionHandler
}
