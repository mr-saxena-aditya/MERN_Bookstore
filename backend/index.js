import express from 'express';
import { PORT , MongoDB_URL} from './config.js'; // Ensure PORT is being exported as a named export
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'; 

const app = express();

app.use(express.json());

// List of Routes


// Route: Go to home page
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the MERN Bookstore')
});

app.use('/books', booksRoute);

mongoose
    .connect(MongoDB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    })
    .catch((error) => console.log('Failed to connect to MongoDB'));

  


