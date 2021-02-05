const ArgValuesHandler = (funcName, funcArgs, argRulesObj = {}) => {

  let _argRules = argRulesObj

  if(typeof _argRules !== 'object') {
    throw Error(`Expected (optional) third argument be typeof "object" with valid key/prop values when given.`)
  }

  if(!_argRules.isStrict) {
    _argRules.isStrict = false
  }

  if(_argRules.isStrict) {
    if(!_argRules.areRequired) {
      _argRules.areRequired = {
        minCount: 1,
        maxCount: 1
      }
    }
    let minCountRuleExists = Object.keys(_argRules.areRequired).includes(`minCount`)
    let maxCountRuleExists = Object.keys(_argRules.areRequired).includes(`maxCount`)
    let strictRulesRequired = [
      minCountRuleExists,
      maxCountRuleExists
    ]
    if(strictRulesRequired.includes(false)) {
      throw Error(`Expected "areRequired" key "minCount" and "maxCount" be defined as typeof "number" with minCount >= 1 and maxCount >= minCount.`)
    }
    if(!(_argRules.areRequired.minCount >= 1)) {
      throw Error(`Expected key "minCount" have value greater than or equa1 to 1.`)
    }
    if(!(_argRules.areRequired.maxCount >= _argRules.areRequired.minCount)) {
      throw Error(`Expected key "maxCount" have value greater than or equa1 to "minCount".`)
    }
    if(funcArgs.length > _argRules.areRequired.maxCount) {
      throw Error(`Maximum argument count expected is ${_argRules.areRequired.maxCount}, but ${funcArgs.length} were found.
        If three arguments are provided, the third should always be an object containing valid keys/props. This object is used
        to override the default Error namespace keys. Or, optionally, pin key names for later return value resolution via string replacement.`)
    }
  }

  console.log(_argRules)

  const _cErrsArgsValidator = (_args) => {
    console.log(_args)
    return _args
  }
  const _uErrsArgsValidator = (_args) => {
    console.log(_args)
    return _args
  }
  const _eArgsValidator = (_args) => {
    console.log(_args)
    return _args
  }

  switch(funcName) {
    case(`CreateErrors`): {
      console.log(`CreateErrors - Validated Args`)
      return _cErrsArgsValidator(funcArgs)
    }
    case(`UseErrors`): {
      console.log(`UseErrors - Validated Args`)
      return _uErrsArgsValidator(funcArgs)
    }
    case(`Err`): {
      console.log(`Err - Validated Args`)
      return _eArgsValidator(funcArgs)
    }
    default: {
      return false
    }
  }
}




const CreateErrors = (...args) => {
  let _argsRef = args

  const initialConf = ArgValuesHandler(`CreateErrors`, _argsRef, {
    areRequired: {
      minCount: 1,
      maxCount: 3
    },
    isStrict: true
  })

  if(!initialConf) {
    throw Error(`Args for validation do not have a func name that matches call site.`)
  }
  else{
    console.log(`Validated Intial Config`)
    console.log(initialConf)
  }

  // console.log(_argsRef)

  const _globalDefsHandler = (_args) => {
    console.log(_args)

    return _args
  }

  return {
    withNamespaceGlobals: (...nsArgs) => _globalDefsHandler(nsArgs),
    globals: (...nsArgs) => _globalDefsHandler(nsArgs)
  }
}


export default CreateErrors
