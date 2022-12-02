var express = require('express');
var router = express.Router();
const Place = require('../models/places');

router.post('/places', (req,res) => {
    
        const newPlace = new Place({
            nickname: req.body.nickname,
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        })
        newPlace.save().then((data) => {
            res.json({result: true, data})
        }).catch(err => {
            res.json({result: false, err})
        })
})

router.get('/places/:nickname', (req,res) => {
    Place.find({nickname: req.params.nickname}).then(data => {
        if (data) {
            res.json({result: true, places:data})
        } else {
            res.json({result: false, error: 'Nickname not found'});
        }
    });
});

router.delete('/places', (req,res) => {
    Place.deleteOne({nickname: req.body.nickname, name: req.body.name}).then(data => {
        if (data){
            res.json({result: true})
        } else {
            res.json({result: false})
        }
    } )
})

module.exports = router;
