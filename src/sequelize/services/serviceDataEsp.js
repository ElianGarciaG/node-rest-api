import { isEmpty } from '../../util/index.js'
import logger from '../../util/logger.js'
import ModelDataEsp from '../models/ModelDataEsp.js'

export default class ServiceDataEsp {
  className = '[ServiceDataEsp]'

  /**
   * Crate register on DATA_ESP
   */
  createRecordOnDataEsp = async ({ latitude, longitude } = {}) => {
    const fName = `${this.className} - createRecordOnDataEsp`

    logger.info(`${fName} validating parameters...`)

    if (isEmpty(latitude)) {
      const error = `No se envio latitud`
      logger.error(`${fName} ${error}`)
      return { success: false, error }
    }

    if (isEmpty(longitude)) {
      const error = `No se envio longitud`
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
