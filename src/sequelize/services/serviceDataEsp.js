import { isEmpty, toNumber } from '../../util/index.js'
import logger from '../../util/logger.js'
import ModelDataEsp from '../models/ModelDataEsp.js'

export default class ServiceDataEsp {
  className = '[ServiceDataEsp]'

  /**
   * Find data
   */
  findDataEspByCriteria = async ({ idRow, numRecords = 10 } = {}) => {
    const fName = '[findDataEspByCriteria]'

    // The query object is constructed
    let where = {}
    let log = 'Performing a query by criteria:'

    if (!isEmpty(numRecords) && toNumber(numRecords)) {
      numRecords = parseInt(numRecords)
      log += ` number of records: ${numRecords}`
    }

    if (!isEmpty(idRow)) {
      where.idRow = idRow
      log += ` rowId: ${idRow}`
    }

    try {
      logger.info(`${fName} ${log}`)
      const actividad = await ModelDataEsp.findAll({ where, limit: numRecords ?? undefined })
      return { success: true, data: actividad }
    } catch (err) {
      const error = `Error when obtaining information from the esp`
      logger.error(`${fName}  ${error}`)
      console.error(err)
      return { success: false, error, exception: err }
    }
  }

  /**
   * Crate register on DATA_ESP
   */
  createRecordOnDataEsp = async ({ latitude, longitude } = {}) => {
    const fName = `${this.className} - createRecordOnDataEsp`

    logger.info(`${fName} validating parameters...`)

    if (isEmpty(latitude)) {
      const error = `Latitude information must be sent`
      logger.error(`${fName} ${error}`)
      return { success: false, error }
    }

    if (isEmpty(longitude)) {
      const error = `Longitude information must be sent`
      logger.error(`${fName} ${error}`)
      return { success: false, error }
    }

    try {
      logger.info(`${fName} Keeping track of location...`)
      const data = await ModelDataEsp.create({ latitude, longitude })
      return { success: true, data }
    } catch (err) {
      const error = 'Error creating record'
      logger.error(`${error}`)
      console.error(err)
      return { success: false, error, exception: err }
    }
  }
}
