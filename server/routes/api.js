var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://abhi:abhipw1@ds149324.mlab.com:49324/videoplayer"
mongoose.Promise = global.Promise;

mongoose.connect(db,{useNewUrlParser:true},function(err,){
    if(err){
        console.error("Error!" + err);
    }
});

router.get('/videos',function(req,res){
    console.log('Get request for all videos');
    Video.find({})
    .exec(function(err,videos){
        if(err){
            console.log("Error retrieving videos");
        }else{
            res.json(videos);
        }
    })
})

router.get('/videos/:id',function(req,res){
    console.log('Get request for one video');
    Video.findOne({"_id":req.params.id})
    .exec(function(err,video){
        if(err){
            console.log("Error retrieving video");
        }else{
            res.json(video);
        }
    })
})

router.post('/video',function(req,res){
    console.log('Post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err,insertedVideo){
        if(err){
            console.log("Error posting video");
        }
        else{
            res.json(insertedVideo);
        }
    });
})

router.put('/video/:id',function(req,res){
    console.log("Update a video")
    Video.findOneAndUpdate({"_id":req.params.id},
    {
        $set: {title:req.body.title, url:req.body.url, description:req.body.description}
    },
    {
        new:true
    },
    function(err,updatedVideo){
        if(err){
            res.send("Error updating video");
        }
        else{
            res.json(updatedVideo);
        }
    }
)
});

router.delete('/video/:id',function(req,res){
    console.log("deleting a video")
    Video.findOneAndDelete({"_id":req.params.id},function(err,deletedVideo){
        if(err){
            res.send("Error deleting video")
        }else{
            res.json(deletedVideo)
        }
    })
})

module.exports = router;