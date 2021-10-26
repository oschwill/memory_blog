import express from 'express';
import bodyParser from 'body-parser'; // depreceated seit express version 4.16+
import mongoose from 'mongoose';
import cors from 'cors';
// environment variables
import dotenv from 'dotenv';

// Routes
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

// DB Connection Setting
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routing
app.use('/posts', postRoutes); // localhost:5000/posts

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
