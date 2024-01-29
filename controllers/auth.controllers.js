exports.login = (req,res)=>{
    console.log("login endpoint called");

    res.send("Welcome to the login page!");
}

exports.test = (req,res)=>{
    console.log(req.body)

    res.send("Welcome to the test page!");
}