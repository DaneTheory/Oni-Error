const OniError = require('../').default



const path = require('path')

const mockedExpectedDirRelPath = `.`
const mockedExpectedFileName = `myFileName`
const mockedExpectedFileExt = `js`
const mockedRecievedRelPathVarRef = `${mockedExpectedDirRelPath}/${mockedExpectedFileName}.${mockedExpectedFileExt}`

const relPathToAbsPath = relPath => path.resolve(relPath)

const mockedResolvedAbsPathFromRelRecievedVarRef = relPathToAbsPath(mockedRecievedRelPathVarRef)


const currUnixTimeInSeconds = Math.round((new Date()).getTime() / 1000)
const parsedDirRoot = path.dirname(mockedResolvedAbsPathFromRelRecievedVarRef)
const parsedExtType = path.extname(path.basename(mockedResolvedAbsPathFromRelRecievedVarRef))
const parsedFileName = path.basename(mockedResolvedAbsPathFromRelRecievedVarRef).replace(parsedExtType,'')




const {
  CreateErrors,
  UseErrors
} = OniError



const myErrorFunctor = (errInstanceObj = {}) => {
  let _err
  _err = errInstanceObj

  console.log(typeof _err)

  return _err
}


const myErrorDefinitions = {
  ErrorWithExplicitMessageOutput: {
    __GlobalErrorScope__: {
      $ParentErrorInstance: `Error`,
      $TemplateParsers: [
        [
          `{{`,
          `}}`
        ],
        [
          `_`,
          `_`
        ]
      ]
    },
    _ErrorLabel: `BadDirPath`,
    _shortErrorLabel: `badDir`,
    _instanceErrorType: `BadDirPathError`,
    _ctx: undefined,
    _message: `Expected a valid, existing directory path.
      _Recieved: {{ dirPathValueRecieved }}_`,
    _: errInstance => myErrorFunctor(errInstance)
  },
  ErrorWithConditionalMessageOutput: {
    _fullErrorName: `BadFilePath`,
    _shortErrorName: `badFile`,
    _instanceErrorType: `BadFilePathError`,
    _ctx: undefined,
    _message: `Expected a valid, existing file name (i.e. {{ alwaysExpectedValidValue }}) at given path.
      _Recieved: {{ _ctx * as errorContext }}

      Path Recieved: {{ dirPathValueRecieved }}
      File Name Recieved: {{ fileNameValueRecieved }}

      Are you sure {{ fileNameValueRecieved }} even exists?

      - {{ timestamp }}_`,
    _: errInstance => myErrorFunctor(errInstance),
    timestamp: new Date().getTime(),
    alwaysExpectedValidValue: `package.json`
  },
  ErrorUsingShortCallForContextMessageOutputOne: {
    _fullErrorName: `BadFileExtensionOne`,
    _shortErrorName: `badExt1`,
    _instanceErrorType: `BadExtPathError`,
    _ctx: undefined,
    _message: `Expected a valid, existing file extension at given path.
      {{ _ctx }}`,
    _: errInstance => myErrorFunctor(errInstance)
  },
  ErrorUsingShortCallForContextMessageOutputTwo: {
    _fullErrorName: `BadFileExtension`,
    _shortErrorName: `badExt`,
    _instanceErrorType: `BadExtPathError`,
    _ctx: undefined,
    _message: `Expected a valid, existing file extension at given path.
      _Recieved: {{ _ctx }}_
      _ Valid Values: {{ validExtValues }}_`,
    _: errInstance => myErrorFunctor(errInstance)
  },
}


const { Err } = UseErrors(myErrorDefinitions)



console.log(`Examples - CreateErrors`)
console.log(`Available API methods:
  withNamespaceGlobals(argOne = required, argTwo)
  globals(argOne = required, argTwo) <Short Form of "withNamespaceGlobals">`)
console.log(`--------------------------------------------------------------`)
console.log(`CreateErrors is typeof "function"`)
console.log(typeof CreateErrors === 'function')
console.log(``)
console.log(`CreateErrors includes one (required) or two (optional) arguments`)
const argObjOne = {
  arg: 'one',
  foo: 'bar',
  me: 'branden'
}
const argObjTwo = {
  arg: 'two',
  foo: 'baz',
  qux: 'hello'
}
const argObjThree = {
  arg: 'three',
  foo: 'hello',
  me: 'dane',
  qux: 'world'
}
const argObjFour = {
  arg: 'four',
  foo: 'noop',
  me: 'boo',
  qux: 'wheehee'
}

CreateErrors(argObjOne)
CreateErrors(argObjOne, argObjTwo)
CreateErrors(argObjOne, argObjTwo, argObjThree)
// CreateErrors(argObjOne, argObjTwo, argObjThree, argObjFour)
console.log(`--------------------------------------------------------------`)



// console.log(`Example One:
//   Single argument, existing error def ref. Full Error Name key ref.`)
// console.log(`---------------------------------------------------------------------------`)
// Err(`BadDirPath`)
// console.log(`---------------------------------------------------------------------------`)
//
//
// console.log(`Example Two:
//   Single argument, existing error def ref. Short Error Name key ref.`)
// console.log(`---------------------------------------------------------------------------`)
// Err(`badDir`)
// console.log(`---------------------------------------------------------------------------`)
//
//
// console.log(`Example Three:
//   Single argument, non-existing error key def ref used. No strings replaced`)
// console.log(`---------------------------------------------------------------------------`)
// Err(`Uh it looks like something went wrong back there!`)
// console.log(`---------------------------------------------------------------------------`)
//
// console.log(`Example Four:
//   Two arguments, existing error key def ref. Strings replaced. Replace existing explicit context.`)
// console.log(`---------------------------------------------------------------------------`)
// Err(`BadFilePath`, {
//   errorContext: mockedRecievedRelPathVarRef,
//   timestamp: currUnixTimeInSeconds,
//   dirPathValueRecieved: parsedDirRoot,
//   fileNameValueRecieved: parsedFileName,
//   fileExtValueRecieved: parsedExtType
// })
// console.log(`---------------------------------------------------------------------------`)
//
// console.log(`Example Five:
//   Three arguments, existing error key def ref. Strings explicitly replaced. Quick, short hand use case.`)
// console.log(`---------------------------------------------------------------------------`)
// Err(`badExt`, parsedExtType, { validExtValues: ['.json, .js'] })
// console.log(`---------------------------------------------------------------------------`)
//
// console.log(`Example Six:
//   Four arguments, existing error key def ref. Strings explicitly replaced. Quick, short hand use case. Last arg acts as function.`)
// console.log(`---------------------------------------------------------------------------`)
// Err(`badExt`, parsedExtType, { validExtValues: ['.json, .js'] }, (_e) => _e)
// console.log(`---------------------------------------------------------------------------`)
//
// console.log(`Example Seven:
//   Two arguments, non-existing error key def. Strings replaced. Quick, short hand use case.`)
// console.log(`---------------------------------------------------------------------------`)
// Err(`Hey the extension you provided doesn't work here buddy. You gave {{ _ctx }}`, parsedExtType)
// console.log(`---------------------------------------------------------------------------`)
