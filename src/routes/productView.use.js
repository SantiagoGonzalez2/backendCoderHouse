import { Router } from 'express'

const router = Router()


router.get('/realtimeproducts', (req,res) =>{
    res.render('productsList',{})
})

export default router