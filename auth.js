// auth.js

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (req.session.isAdmin ) {
        next();
    } else {
        res.redirect('/login');
    }
}

function isLogged(req, res, next) {
    if (req.session.logged ) {
        next();
    } else {
        res.redirect('/login');
    }
}


module.exports = { isAdmin,isLogged };
