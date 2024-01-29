exports.login = (req, res) => {

  const {email, password} = req.body;

  if(!email || !password) {
    res.send({
      message: "Provide all required credentials!"
    }).status(401);
  }else {
    
  }
  console.log("login endpoint called");

  res.send("Welcome to the login page!");
};
