const db = require('../../models/db');
const sequelize = require('sequelize');
const {Song,Album,Playlist,Artist} = db;

exports.search = async (req,resp,next) =>{
    const searchQuery = req.body.searchQuery;
    try{ 
        const songs = await Song.findAll({
            where : {
                'title' : sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + searchQuery + '%')
            }
        });
        const playlists = await Playlist.findAll({
            where : {
                type : 'public',
                title : sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + searchQuery + '%')
            }
        });

        const albums = await Album.findAll({
            where : {
                title : sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + searchQuery + '%'),
            }
        });

        const artists = await Artist.findAll({
            where : {
                artistName : sequelize.where(sequelize.fn('LOWER', sequelize.col('artistName')), 'LIKE', '%' + searchQuery + '%')
            }
        });
        const result = {
            albums : albums,
            playlists:  playlists,
            songs : songs,
            artists : artists
        };
        if(result) {
            resp.status(200).send(result);
        }else{
            resp.status(500).send('No search result');
        }
    }catch(err){
        resp.status(400).send(err);
    }
}
