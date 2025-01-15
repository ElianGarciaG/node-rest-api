import { Router } from 'express'
import postDataEsp from './controllers/postDataEsp.js'

const router = Router({ mergeParams: true })

router.post('/data/save', postDataEsp)

export default router
