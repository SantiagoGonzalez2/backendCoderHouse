const socket = io();


const formDelate = document.getElementById("formDelate")

formDelate = addEventListener("submit", deleted)

function deleted (e){
e.preventDefault()

let id = document.getElementById("IDdelete").value

socket.emit("IDdelete", id)

formDelate.reset()
}

socket.on("borrado", data =>{
    !alert(data + 'producto eliminado')
})