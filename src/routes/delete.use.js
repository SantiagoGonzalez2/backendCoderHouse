import { Router } from 'express'
import { isAdmin } from '../utils.js'

const router = Router()


router.get('/delete',isAdmin, (req,res) =>{
    res.render('delete',{})
})

export default router