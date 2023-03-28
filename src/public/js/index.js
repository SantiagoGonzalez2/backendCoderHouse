const socket = io();

const formulario = document.getElementById("formulario")
formulario.addEventListener("submit", validarform)


function validarform(e){
    e.preventDefault()
    let title = document.getElementById("title").value
    let description = document.getElementById("description").value
    let price = document.getElementById("price").value
    let img = document.getElementById("img").value
    let code = document.getElementById("code").value
    let stock = document.getElementById("stock").value
    let status = document.getElementById("status").value

    
    let productToAgree = {
        title : title,
        description: description,
        price: price,
        thumbnail: img,
        code : code ,
        stock: stock,
        status: status
    }

    if (!productToAgree.title || !productToAgree.description || !productToAgree.price ||

        !productToAgree.thumbnail || !productToAgree.code || !productToAgree.stock || !productToAgree.status) alert("Completar todos los campos, 5 horas me llevo este codigo para que mandes los inputs vacios")
   else {
    console.log(productToAgree);
     socket.emit('data', productToAgree)}
     alert(`Producto con titulo:"" ${productToAgree.title} ""agregado`)

     formulario.reset()

}












