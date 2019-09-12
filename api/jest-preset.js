const { merge } = require('lodash')
const tsJestPreset = require('ts-jest').jestPreset
const jestMongodbPreset = require('@shelf/jest-mongodb/jest-preset')

module.exports = merge(
  jestMongodbPreset,
  tsJestPreset,
)
