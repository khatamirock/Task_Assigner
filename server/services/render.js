const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    
    axios.get('http://localhost:5000/api/users')
    .then(function(response){
            console.log("kire mama in homeROUTes");
            // console.log(response);
            
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            console.log("ERR>>>>>>>>>>>>>>>>>>");
            
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:5000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.delete_user = (req, res) => {
    const id = req.query.id; // Retrieve the id from req.query

    // Delete operation with axios
    axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(function(response){
            res.redirect("/");
        })
        .catch(err =>{
            res.send(err);
        })
}




