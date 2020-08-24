module.exports = (req,res,next)=> {
    if(!req.session.isLoggedIn){
        console.log('bhai tu login kr pehle');
        return res.redirect('/login');
      }
      next();
}