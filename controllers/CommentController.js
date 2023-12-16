
import comment from '../models/Comment.js'

export const create = async(req,res)=> {
    try {
      

        const doc = new comment({
            text: req.body.text,
            raiting: req.body.raiting,
            authorId: req.body.authorId,
            gameId: req.body.gameId,
        }, );
        
        const post = await doc.save();

        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'не оставить комментарий'
        })
    }
}

export const getAll = async(req,res) =>{
    try {
        const doc = await comment.find();
        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'не удалось получить игры '
        })
    }
} 


export const deleteComm = async(req,res)=>{
    try {
        const gameId = req.params.id;
        
        const game = await comment.findOneAndDelete({_id: gameId});
        if(!game){ return (res.status(404).json({message:"нет игры"}))}
        res.json({message: 'succsess'})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'не удалось вернуть игру '
        })
    }
}

export const updateComm = async(req, res)=>{
    try {
        const gameId = req.params.id;
        await comment.updateOne(
            {
                _id: gameId
            },
            {
                text: req.body.text,    
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

//  https://stackoverflow.com/questions/59859173/how-to-populate-in-nodejs-and-mongoose-a-post-which-need-to-be-referred-to-a-use