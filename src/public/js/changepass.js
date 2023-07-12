const form = document.getElementById('form');



form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value,key)=>obj[key]=value);
    
    fetch(`/api/sessions/mail`,{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(
        alert('Correo enviado'),
        window.location.replace('/users/login')

       
    )
    form.reset()
})