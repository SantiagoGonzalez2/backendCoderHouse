

const formDelate = document.getElementById("formDelate")

formDelate = addEventListener("submit", deleted)

function deleted (e){
    e.preventDefault()

    let pid = document.getElementById("IDdelete").value

    fetch(`/api/products/${pid}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            alert(`Producto con ID ${pid} eliminado`);
        }else if(result.status ===401){
            alert("No se pudo eliminar el producto")
        }
    })

    formDelate.reset()
}