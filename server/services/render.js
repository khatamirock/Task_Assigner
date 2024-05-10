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

exports.add_post= (req,res)=>{

    axios.get('http://localhost:5000/api/users')
    .then(function(response) {
        console.log('Request successful:');
        console.log(response.data);
        res.render('add_post', { users : response.data });
    })
    .catch(err => {
        console.error('Error making GET request:', err);
        res.status(500).send('Internal Server Error');
    })
    
    
}

exports.find_post=(req, res) => {
    const userId = req.query.id; // Use req.params.id to access route parameters
    console.log(userId);
    axios.get(`http://localhost:5000/api/post/${userId}`) // Use ${userId} to include the user ID in the URL
        .then(function(userdata){
            console.log("\n\n\n\n>>>>>>>>>>>");
            console.log(userdata.data);
            res.render('post_of_user', { posts : userdata.data});
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            res.status(500).send("Error fetching user data");
        });
 
    // Fetch posts for the user with the provided userId
    // // For now, let's assume you have fetched posts based on the user's ID
    // const posts = [
    //     { title: "Post 1", content: "Content of Post 1" },
    //     { title: "Post 2", content: "Content of Post 2" },
    //     // Add more posts as needed
    // ];
    // res.render('post_of_user', { posts: posts });
};





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




