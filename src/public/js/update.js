const form = document.getElementById('form');



form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value,key)=>obj[key]=value);
    
    const tokenElement = document.querySelector('#token');
    const token = tokenElement.textContent;



    fetch(`/api/sessions/updatepassword/${token}`,{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(
        alert("completo la solicitud, pero no hay respuesta aqui ya que de eso se debe encargar un FRONT"),
        window.location.replace('/users/login')

       
    )
    form.reset()
})