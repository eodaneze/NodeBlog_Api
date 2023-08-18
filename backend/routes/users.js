const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcrypt');
// UPDATE
router.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id){
         if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
         }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json({message: "Your account have been updated successfully", updatedUser});
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("You can update only your account!")
    }
})


// DELETE
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id){
        try{
             const user = await User.findById(req.params.id);
             !user && res.send('User not found');
            try{
                await Post.deleteMany({username: user.username})
                const updatedUser = await User.findByIdAndDelete(req.params.id);
                res.status(200).json({message: "Your account have been deleted successfully"});
            }catch(err){
                res.status(500).json(err)
            }

        }catch(err){
             res.status(500).json(err)
        }
        
    }else{
        res.status(401).json("You can delete only your account!")
    }
})


// GET USER
router.get('/:id', async(req, res) => {
     try{
         const user = await User.findById(req.params.id);
         const {password, ...others} = user._doc;
         res.status(200).json(others);
     }catch(err){
        res.status(500).json(err)
     }
})



module.exports = router;


