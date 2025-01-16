import ServiceDataEsp from '../../../sequelize/services/serviceDataEsp.js'
import { isEmpty } from '../../../util/index.js'
import logger from '../../../util/logger.js'

export default async (req, res) => {
  const fName = '[getDataEsp]'

  const { id, numRecords } = req.query ?? {}

  logger.info(`${fName} - Execute ServiceDataEsp...`)
  const serviceDataEsp = new ServiceDataEsp()
  const result = await serviceDataEsp.findDataEspByCriteria({
    id,
    numRecords,
  })

  if (!result?.success) {
    const error = result?.error ?? `Error consulting the information of the esp`
    logger.error(`${fName} ${error}`)
    return res.status(400).json({ success: false, error })
  }

  if (isEmpty(result?.data)) {
    const msg = `No data found for the esp`
    logger.error(`${fName} ${msg}`)
    return res.status(200).json({ success: true, msg })
  }

  logger.info(`${fName} - Successful result...`)
  res.status(200).json(result?.data)
}
