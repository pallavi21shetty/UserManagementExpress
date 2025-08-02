const express = require("express")
const router = express.Router();
const verify_token = require('../middleware/verification')
// const jwt = require('jsonwebtoken');
// let User = require('../model/user')

const {register, login, profile , transaction, wishlist} = require("../controllers/usercontroller")

// const verify_token = async ( req, res, next)=>{
//     let token = req.header('Authorization')
//     if(token){
//         try{
//         console.log(token);

//        let payload = jwt.verify(token, process.env.JWT_SECRET)
//         // console.log(payload);
//         console.log(payload.id);

//         let user = await User.findById(payload.id)
//         console.log(user);
        
//         req.user=user

//         next()
//         }
//         catch{
//             res.send('invalid token')
//         }
//     }
//     else{
//         res.send('No Access!!')
//     }
// }

router.post('/register/', register)
router.get('/login/', login)
router.get('/profile/',verify_token, profile)

router.get('/transaction/',verify_token, transaction)
router.get('/wishlist/',verify_token, wishlist)


module.exports = router;