const formulario = document.getElementById("formulario")


formulario.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(formulario);
      const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/products',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            alert(`Producto agregado`)
            window.location.replace('/views/products');
        }else if (result.status ===401){
            alert(" invalido!!")
        }
    })
})









