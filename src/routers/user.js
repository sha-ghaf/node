const express = require ('express')
const User = require('../models/userModel')
const router = express.Router()

/*=============== post =================*/
router.post ('/users' , (req , res) => {
    console.log(req.body)
    const user = new User (req.body)
    user.save()
        .then ((user) => {res.status(200).send(user)})
        .catch((error)=>{ 
            res.status(400).send(error)
        })
}) 

/*=============== getAllUser =================*/
router.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.status(200).send(users)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

/*=============== getOneUser =================*/
router.get('/users/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((userId)=>{
        if(!userId){
            return res.status(404).send("can't find userId")
        }
        res.status(200).send(userId)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

/*=============== patch =================*/
router.patch('/users/:id',async(req,res)=>{
    try{
        const updates = Object.keys (req.body)
        const _id = req.params.id
        const user = await User.findById (_id)
        if(!user){
            return res.status(404).send('user is not found')
        }
        updates.forEach((item) => (user[item] = req.body[item]))
        await user.save()
        res.status(200).send(user)
    }
    catch(error){
        res.status(400).send(error)
    }
})

/*=============== delete =================*/
router.delete('/users/:id',async(req,res)=>{
    try{
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send('Unable to find user')
        } else{
            res.status(200).send(user)
        }
    }
    catch(error){
        res.status(500).send(error)
    }
})

/*=============== login =================*/
router.post('/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        res.status(200).send({user})
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router 
