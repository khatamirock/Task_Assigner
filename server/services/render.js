const axios = require('axios');


async function findUserData(id) {
    console.log("\n\n\n ub find user data|||||||||||||||", id, '|||||||||||||||\n\n\n');
    try {
        const response = await axios.get('http://localhost:5000/api/users', {
            params: { id }
        });
        return response.data;
    } catch (error) {
        throw error;
    }

    
}






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

exports.find_post=async (req, res) => {
    const userId = req.query.id; // Use req.params.id to access route parameters
    console.log(userId);
    const data=await findUserData(userId);
    axios.get(`http://localhost:5000/api/post/${userId}`) // Use ${userId} to include the user ID in the URL
        .then(function(userdata){
            // console.log(userdata.data);
            
            console.log("\n\n\n|||||||||||||||", data, '|||||||||||||||\n\n\n');
            res.render('post_of_user', { posts : userdata.data,user:data.name,status:data.status});
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            res.status(500).send("Error fetching user data");
        });
 
 
};





exports.update_user =async (req, res) =>{
    try {
        const userData = await findUserData(req.query.id);
        console.log("\n\n\n|||||||||||||||", userData, '|||||||||||||||\n\n\n');
        res.render("update_user", { user: userData });
    } catch (error) {
        res.send(error);
    }
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




