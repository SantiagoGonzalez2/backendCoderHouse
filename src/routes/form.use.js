import { Router } from 'express'

const router = Router()


router.get('/cargaproducto', (req,res) =>{
    res.render('index',{})
})

export default router