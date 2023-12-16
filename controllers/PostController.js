import GameModel from '../models/Game.js'

/* export const getLastTags = async(req, res)=> {
    try {
        const games = await GameModel.find().limit(5).exec();

        const tags = posts.map(obj=> obj.)
        res.json(games);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'не удалось получить жанры '
        })
    }
} */

export const update = async (req, res)=> {
    try {
        const gameId = req.params.id;
        await GameModel.updateOne(
            {
                _id: gameId
            },
            {
                title: req.body.title,
            genre: req.body.genre,
            type: req.body.type,
            avatarUrl: req.body.avatarUrl,
            releaseDate: req.body.releaseDate,
            developer: req.body.developer,
            publisher: req.body.publisher,
            localization: req.body.localization,
            userRating: req.body.userRating,
            ageRating: req.body.ageRating,
            description: req.body.description,
            logoUrl: req.body.logoUrl,
            devices: req.body.devices,
            series: req.body.series,
            },

            )

            res.json({
                success: true,
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'не удалось изменить игру '
        })
    }
}

export const remove = async(req,res) =>{
    /* try {
        const gameId = req.params.id;
        
    await GameModel.findByIdAndDelete({_id: gameId},
    (err, doc)=> {
        if(err){
            console.log(error);
            return res.status(500).json({
            message: 'не удалось удалить игру '
        })
        }

        if(!doc){
            return (res.status(404).json({message:"нет игры"}))
        }

        res.json({
            success:true
        });


    })
        if(!game){ return (res.status(404).json({message:"нет статьи"}))}
        res.json(game)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'не удалось вернуть игру '
        })
    } */

    try {
        const gameId = req.params.id;
        
        const game = await GameModel.findOneAndDelete(gameId);
        if(!game){ return (res.status(404).json({message:"нет игры"}))}
        res.json({message: 'succsess'})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'не удалось вернуть игру '
        })
    }
} 

export const getOne = async(req,res) =>{
    try {
        const gameId = req.params.id;
        
        const game = await GameModel.findById(gameId);
        if(!game){ return (res.status(404).json({message:"нет игры"}))}
        res.json(game)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'не удалось вернуть игру '
        })
    }
} 


export const getAll = async(req,res) =>{
    try {
        const games = await GameModel.find();
        res.json(games);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'не удалось получить игры '
        })
    }
} 

export const create = async(req,res)=> {
    try {
        const doc = new GameModel({
            title: req.body.title,
            genre: req.body.genre,
            type: req.body.type,
            avatarUrl: req.body.avatarUrl,
            releaseDate: req.body.releaseDate,
            developer: req.body.developer,
            publisher: req.body.publisher,
            localization: req.body.localization,
            userRating: req.body.userRating,
            ageRating: req.body.ageRating,
            description: req.body.description,
            logoUrl: req.body.logoUrl,
            devices: req.body.devices,
            series: req.body.series,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'не удалось загрузить игру'
        })
    }
}