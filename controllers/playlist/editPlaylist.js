const e = require('express');
const db= require('../../models/db');
const {Playlist} = db;

exports.editPlaylist = async (req,resp,next) => {
    const userId = req.userId;
    try{
        if(!userId){//if user want to create playlist without login
            resp.status(500).send('You have to login first');
        }
        let playlist = await  Playlist.findByPk(req.body.playlistId);
        if(userId === playlist.userId){

            playlist.title =  req.body.title;
            playlist.cover = req.body.cover;
            playlist.description = req.body.description;

            if(req.body.type ){
                playlist.type = req.body.type;
            }else {
                playlist.type = 'private';
            }
            playlist = await playlist.save();
            resp.status(200).send(playlist);
        }
        resp.status(500).send({message : 'No rights to edit',cause : 'Created By someone'});
    }catch(err) {
        resp.status(400).send(err.message);
    }
}

exports.getEditPlaylist = async (req,resp,next) =>{
    try{
        // if(req.userId){//if user want to create playlist without login
        //     resp.status(500).redirect('/');
        // }
        console.log("hi");
        const playlist = await Playlist.findByPk(req.body.playlistId);
        
        resp.send({
            title : playlist.title,
            description : playlist.description,
            cover : playlist.cover,
            type : playlist.type,
        });
    }catch(error) {
        resp.status(400).send(err);
    }
}