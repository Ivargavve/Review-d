import express from 'express'; //Express.js framework
import bodyParser from 'body-parser'; //Parse incoming request bodies in a middleware before your handlers
import mongoose from 'mongoose'; //MongoDB
import cors from 'cors'; //Cross-origin resource sharing
import dotenv from 'dotenv'; //Environment variables
import multer from 'multer'; //Store files
import helmet from 'helmet'; //Security
import morgan from 'morgan'; //HTTP request logger
import path from 'path'; //Path module
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/user.js';
import { users, posts } from './data/index.js';
import Post from './models/post.js';

/* Configurations comes from package instructions */

/* CONFIGURATIONS, middleware aswell as package configurations */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( {policy: "cross-origin"} ));
app.use(morgan("common"));
app.use(bodyParser.json( {limit: "30mb", extended: true} )); // parse incoming requests with json 
app.use(bodyParser.urlencoded( {limit: "30mb", extended: true} )); // parse incoming requests with urlencoded payloads
app.use(cors());
app.use("./assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE configurations */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    } ,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    /* JUST ADD THIS ONCE, THEN MONGODB IS SETUP WITH TEST USERS AND POSTS */
    //User.insertMany(users);
    //Post.insertMany(posts);

}).catch((error) => {
    console.log(`${error} did not connect`);
});
