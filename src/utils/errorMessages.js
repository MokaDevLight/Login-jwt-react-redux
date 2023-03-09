// @flow

import Data from 'JSONs/ErrorMessage'

function errorMessages(dataMessage, types) {
  const parsMessage = JSON.parse(dataMessage.message)
  const filterData = Data.filter((item) => {
    return item.code === parsMessage.Code
  })
  if (types) {
    if (types === 'employ') {
      return filterData[0].type.employ
    }
  } else {
    return filterData[0].textMessage
  }
}
export default errorMessages
