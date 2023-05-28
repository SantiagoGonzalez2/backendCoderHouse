import { Router } from 'express'
import { productsModel } from '../../db/models/products.model.js';
import passport from 'passport';




const router = Router()


router.get('/products' , passport.authenticate("jwt", { session: false }), async (req,res) =>{
   
    try {
        let page = parseInt(req.query.page);
    
        if (!page) page = 1;
    
        let { limit } = req.query;

        if(!limit)  limit =  4

        const { searchQuery } = req.query;
        let query = {};

        if (searchQuery) {
          query.title = { $regex: searchQuery, $options: 'i' }; 
        }

       


    
        let productsMongoDB = await productsModel.paginate(query,{sort: { price : 1 },page,limit:limit,  lean:true})
    
        productsMongoDB.prevLink = productsMongoDB.hasPrevPage?`http://localhost:8080/views/products?page=${productsMongoDB.prevPage}`:'';
        productsMongoDB.nextLink = productsMongoDB.hasNextPage?`http://localhost:8080/views/products?page=${productsMongoDB.nextPage}`:'';
        productsMongoDB.isValid= !(page<=0||page>productsMongoDB.totalPages)
      
        res.render('productsList', 
         {...productsMongoDB,
          user : req.user}
          
          
        );
        
    
    
      } catch (error) {
        console.log("no se pudo conectar con MONGODB " + error);
      }
    });


router.get('/delete',passport.authenticate('jwt', { session: false }),(req,res) =>{
      res.render('delete',{})
  })

router.get('/cargaproducto',passport.authenticate('admin-jwt', { session: false }), (req,res) =>{
    res.render('index',{})
})
export default router