import { Router } from 'express'
import { productsModel } from '../models/products.model.js';
import { isAuthenticated } from '../utils.js';



const router = Router()


router.get('/products',  isAuthenticated, async (req,res) =>{
   
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
          user : req.session.user}
          
          
        );
        
    
    
      } catch (error) {
        console.log("no se pudo conectar con MONGODB " + error);
      }
    });


export default router