const socket = io();





socket.on("products", data =>{
    console.log(data);
    
data.forEach((producto) => {
    const div = document.createElement('div')

    div.innerHTML = `
    
    
   
      <p>TITULO: ${producto.title}<br>$${producto.price}
      DESCRIPCION: ${producto.description}<br>CODE: ${producto.code}<br>STOCK: ${producto.stock} <br> ID : ${producto.id}</p>
      
    </div> 
   
  </div> 
  
      
    `
    contenedor.appendChild(div)})
})









