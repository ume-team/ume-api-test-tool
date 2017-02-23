import config from '../../config'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'

function getConfigValue (key) {
  let env = process.env.NODE_ENV === 'production' ? 'build' : 'dev'
  let result = config[env].env[key]
  return result ? result.replace(/"/g, '') : ''
}

function getNow (format = 'LL') {
  return moment().format(format)
}

function isEqual (value, other) {
  return _.isEqual(value, other)
}

function cloneDeep (objects) {
  return _.cloneDeep(objects)
}

export default {
  getConfigValue,
  getNow,
  isEqual,
  cloneDeep
}
