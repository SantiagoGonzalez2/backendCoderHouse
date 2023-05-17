const logoutForm = document.querySelector('Idform');

logoutForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevenimos que se haga el submit por defecto del formulario

  try {
    const response = await fetch('/usuarios/logout', {
      method: 'GET',
      credentials: 'include', // Incluir cookies en la petición
    });
    if (response.ok) {
      console.log('Usuario desconectado');    
    } else {
      console.error('Error al desconectar el usuario');
    }
  } catch (error) {
    console.error('Error al enviar la petición', error);
  }
});
