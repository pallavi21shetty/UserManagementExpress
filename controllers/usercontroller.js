let User = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let register =  async (req,res) => { 
    // let email = req.body.email
    // let name = req.body.name
    // let password = req.body.password
    let {email, name, password} = req.body
    console.log(email, name, password);
        //or
    // console.log(req.body);

const salt = bcrypt.genSaltSync(10);
password = bcrypt.hashSync(password, salt);

    let user = new User({email, name, password})
    await user.save()
    // res.send('This is register page')

    let payload = {id:user.id}
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn:'1h'
        }, (err,token) => {
            if(err){
                throw err
            }
            else{
                res.send(token)
            }
        }
    ).catch(()=>{
        console.log("Error signing jwt!!")
    })

     res.send(user) // response we get what we passed in json format
}



let login = async (req,res) => {
    let {inp_email, inp_password} = req.body

    let user=await User.findOne({email:inp_email})
    let isValidPWD = await bcrypt.compare(inp_password, user.password)

    // let user = await User.findOne(
    //     {email:inp_email, password:inp_password})
    // console.log(user);
    // if (!user){
    if(!isValidPWD){
   res.status(400).json("user not found!!")
    }else{
   res.status(200).json(user)
    }
}




let profile = async (req,res) => {
    // let {inp_email, inp_password} = req.body
    // let user=await User.findOne({email:inp_email})
    // let isValidPWD = await bcrypt.compare(inp_password, user.password)
    // if(isValidPWD){
//    res.status(200).json(user)
    //}

    // const user= await User.findOne(
    //     {"email": req.body.email}
    // )
    // // res.send(user)
    // res.status(200).json(user)

    //   res.status(200).send("this is profile page!")
         res.status(200).send(req.user)
}



let transaction = async (req,res) => {
    // let {inp_email, inp_password} = req.body
    // let user=await User.findOne({email:inp_email})
    // let isValidPWD = await bcrypt.compare(inp_password, user.password)
    //  if(isValidPWD){
     res.status(200).send("this is transaction page!")
   // }
}



let wishlist = async (req,res) => {
//    let {inp_email, inp_password} = req.body
//     let user=await User.findOne({email:inp_email})
//     let isValidPWD = await bcrypt.compare(inp_password, user.password)
//      if(isValidPWD){
     res.status(200).send("this is wishlist page!")
   // }
}

    
module.exports = {
    login,
    register,
    profile,
    transaction,
    wishlist
}