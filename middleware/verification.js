const jwt = require('jsonwebtoken');
let User = require('../model/user')


const verify_token = async ( req, res, next)=>{
    let token = req.header('Authorization')
    if(token){
        try{
        console.log(token);

       let payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(payload);
        console.log(payload.id);

        let user = await User.findById(payload.id)
        console.log(user);
        
        req.user=user

        next()
        }
        catch{
            res.send('invalid token')
        }
    }
    else{
        res.send('No Access!!')
    }
}


module.exports = verify_token