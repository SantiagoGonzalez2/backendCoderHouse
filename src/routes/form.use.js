import { Router } from 'express'
import { isAdmin } from '../utils.js'

const router = Router()


router.get('/cargaproducto',isAdmin, (req,res) =>{
    res.render('index',{})
})

export default router