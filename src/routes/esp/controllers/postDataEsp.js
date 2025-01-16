import ServiceDataEsp from '../../../sequelize/services/serviceDataEsp.js'
import { isEmpty } from '../../../util/index.js'
import logger from '../../../util/logger.js'

export default async (req, res) => {
  const fName = '[postDataEsp]'

  const { latitude, longitude } = req.body ?? {}

  if (isEmpty(latitude)) {
    const error = `Latitude information must be sent`
    logger.error(`${fName} ${error}`)
    return res.status(400).json({ success: false, error })
  }

  if (isEmpty(longitude)) {
    const error = `Longitude information must be sent`
    logger.error(`${fName} ${error}`)
    return res.status(400).json({ success: false, error })
  }

  logger.info(`${fName} - Running ServiceDataEsp`)
  const serviceDataEsp = new ServiceDataEsp()
  const result = await serviceDataEsp.createRecordOnDataEsp({
    latitude,
    longitude,
  })

  if (!result?.success) {
    const error = result?.error ?? `Error inserting information`
    logger.error(`${fName} ${error}`)
    return res.status(400).json({ success: false, error })
  }

  logger.info(`${fName} - Successfull result...`)
  res.status(200).json(result)
}
