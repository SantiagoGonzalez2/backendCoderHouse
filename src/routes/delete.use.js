import { Router } from 'express'
import passport from 'passport'


const router = Router()


router.get('/delete',passport.authenticate('jwt', { session: false }),(req,res) =>{
    res.render('delete',{})
})

export default router