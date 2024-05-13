const axios = require('axios');
const {Userdb,Postdb}=require('../model/model');

async function findUserData(id) {
    // console.log("\n\n\n ub find user data|||||||||||||||", id, '|||||||||||||||\n\n\n');
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




exports.login_sys=((req,res)=>{

    const {user,pass}=req.body;
    console.log("\n\n\n|||||||||||||||ytytytyt", user,pass, '|||||||||||||||\n\n\n');
    Userdb.find({name:user,password:pass})
        .then((usr)=>{
            
            console.log(usr);
            const id=usr[0]._id;
            if(usr.length==1){
            
            
            req.session.logged=true;
            if(pass==="222"){
                
                req.session.isAdmin = true;
                
            }
            if(req.session.isAdmin){

                res.redirect('/');
            }
            else{

                res.redirect(`/user-home?user=${user}&id=${id}`);
            }
        }
        else{
            res.send("wrong credentials");
        }

        })
        .catch(e=>{
            res.send(e);
        })

    
    // res.send("hello")
})




exports.logout = (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).send("Error logging out");
        } else {
            res.redirect('/login');
        }
    });
};




exports.signup_Syst=(req, res)=>{

    // res.render('signIn_Syst');
    // res.send("hello");
    res.render('user-signup');
}

