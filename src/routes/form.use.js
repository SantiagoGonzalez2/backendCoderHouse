import { Router } from 'express'
import passport from 'passport'


const router = Router()


router.get('/cargaproducto',passport.authenticate('admin-jwt', { session: false }), (req,res) =>{
    res.render('index',{})
})

export default router