import {Router} from 'express';
import UserDTO from '../../services/dto/user.dto.js'
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

router.get('/update/:token', (req, res) => {
    const token = req.params.token;
    res.render('update', { token });
  });
  

router.get('/changepass', (req,res)=>{
    res.render('changePass')
})

export default router 