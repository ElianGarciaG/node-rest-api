import ServiceDataEsp from '../../../sequelize/services/serviceDataEsp.js'
import { isEmpty } from '../../../util/index.js'
import logger from '../../../util/logger.js'

export default async (req, res) => {
  const fName = '[postDataEsp]'

  const { latitude, longitude } = req.body ?? {}

  if (isEmpty(latitude)) {
    const error = `Se debe enviar la informacion de latitud`
    logger.error(`${fName} ${error}`)
    return res.status(400).json({ success: false, error })
  }

  if (isEmpty(longitude)) {
    const error = `Se debe enviar la informacion de longitud`
    logger.error(`${fName} ${error}`)
    return res.status(400).json({ success: false, error })
  }

  logger.info(`${fName} - Running ServiceDataEsp`)
  const serviceDataEsp = new ServiceDataEsp()
  const result = await serviceDataEsp.createRecordOnDataEsp({
    latitude,
    longitude,
  })

  res.status(result?.success ? 200 : 400).json(result)
}
