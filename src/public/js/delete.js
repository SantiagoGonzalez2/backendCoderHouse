const socket = io();


const formDelate = document.getElementById("formDelate")

formDelate = addEventListener("submit", deleted)

function deleted (e){
e.preventDefault()

let id = document.getElementById("IDdelete").value
!alert("Producto borrado")
socket.emit("IDdelete", id)
formDelate.reset()
}