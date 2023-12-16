import express from "express";
import mongoose from "mongoose";
import { registerValidation,loginValidation } from "./validations/auth.js";
import { postCreateValidation} from "./validations/Post.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import multer from 'multer';
import handleValidationsErrors from "./utils/handleValidationsErrors.js";
import fs from 'fs';
import cors from 'cors';

const mongoDBURL = 'mongodb+srv://OPAJS:SoVmEr05H0knpkrX@cluster0.uokzucv.mongodb.net/game-collection?retryWrites=true&w=majority'
/* 'mongodb+srv://OPAJS:SoVmEr05H0knpkrX@cluster0.uokzucv.mongodb.net/game-collection?retryWrites=true&w=majority' */
mongoose.connect(
    mongoDBURL,
).then(()=>{
    console.log('connectend-!')
}).catch((err)=>{
    console.log(err)
})

const app = express();


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
      }
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });
const upload = multer({storage})

app.use(express.json()); // позволяет читать json файлы
app.use(cors())

app.use('/uploads', express.static('uploads'));
app.get('/', (req, res)=>{
    res.send('jopa')
})
app.post('/login',loginValidation,handleValidationsErrors,UserController.login )
app.post('/register',registerValidation, handleValidationsErrors,UserController.register);
app.get('/me', checkAuth, UserController.getMe)

app.post('/upload', /* checkAuth,  */upload.single('image'), (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  });

app.post('/Games', checkAuth, postCreateValidation,handleValidationsErrors,PostController.create) // чтобы добавлять мог только модератор (доделать логику на пользовательские роли)
app.get('/Games',  PostController.getAll) // для связи моделей 1:37:10
/* app.get('/Games/genre', PostController.getLastTags); 2:31:0 */
app.get('/Games/:id', PostController.getOne)
app.delete('/Games/:id',checkAuth, PostController.remove)
app.patch('/Games/:id',checkAuth, postCreateValidation,handleValidationsErrors,PostController.update)

const port = 4444;
app.listen(port, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log(`servers started at ${port}`)
})