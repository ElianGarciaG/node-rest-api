import { Router } from 'express'
import getDataEsp from './controllers/getDataEsp.js'
import postDataEsp from './controllers/postDataEsp.js'

const router = Router({ mergeParams: true })

router.get('/data', getDataEsp)

router.post('/data/save', postDataEsp)

export default router
