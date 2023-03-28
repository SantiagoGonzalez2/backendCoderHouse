import { Router } from 'express'

const router = Router()


router.get('/delete', (req,res) =>{
    res.render('delete',{})
})

export default router