


  const logoutBtn = document.getElementById('logOut');
  logoutBtn.addEventListener('click', async () => {
    const response = await fetch('/api/sessions/logout', { method: 'POST' });
    if (response.ok) {
      window.location.href = '/users/login';
    } else {
      console.error('Error logging out');
    }
  });

