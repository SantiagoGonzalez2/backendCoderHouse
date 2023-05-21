import {Router} from 'express';
const router = Router();



router.get('/register', (req, res)=>{
    res.render("register");
})

router.get('/login', (req, res)=>{
    res.render('login')
})



router.get('/', (req, res)=>{
    res.render("productView", {
        user: req.user
        
    });
   
})
export default router 