import api from '../controllers/product'
import KoaRouter from 'koa-router'

const router = KoaRouter()

router.get('/test', api.getProduct())

export default router
