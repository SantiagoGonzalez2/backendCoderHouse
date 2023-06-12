
const renderChat = (req, res) => {

  let user = req.user
    res.render('chat',{user});
  };
  
  export default { renderChat };