import express from 'express';
import { PORT , MongoDB_URL} from './config.js'; // Ensure PORT is being exported as a named export
import mongoose from 'mongoose';
import { Book } from './models/book_model.js';

const app = express();

app.use(express.json());

// List of Routes

// Route: Go to home page
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the MERN Bookstore')
});

// Post a book
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.genre ||
            !request.body.publicationYear
        ){
            return response.status(400).send('All fields are required');
        }

        const newBook = new Book({
            title: request.body.title,
            author: request.body.author,
            genre: request.body.genre,
            publicationYear: request.body.publicationYear
        });

        const book = Book.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        return response.status(500).send(error.message);
    }
});

mongoose
    .connect(MongoDB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    })
    .catch((error) => console.log('Failed to connect to MongoDB'));

  


