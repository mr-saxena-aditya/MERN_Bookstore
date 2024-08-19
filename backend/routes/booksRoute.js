import express from 'express';
import { Book } from '../models/book_model.js';

const router = express.Router();


/**
 * CREATE OPERATIONS
 */
// Post a book
router.post('/', async (request, response) => {
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

/**
 * READ OPERATIONS
 */
// Route: Get all books
router.get('/', async(request, response) => {
        try {
            const books = await Book.find({});
            return response.status(200).json({
                count: books.length,
                data: books
            })
        } catch (error) {
            console.log(error.message);
            return response.status(500).send(error.message);
        }
    }
);

// Route: Get a book by ID
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);

        if (!book) return response.status(404).send('Book not found');

        return response.status(200).json(book);
    } catch (error) {
        return response.status(500).send(error.message);
    }
});

/**
 * UPDATE OPERATIONS
 */
// Route: Update a book by ID
router.put('/:id', async (request, response) => {
    try {
        // Validate request body
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.genre ||
            !request.body.publicationYear
        ) {
            return response.status(400).send('All fields are required');
        }

        const { id } = request.params;

        // Update the book by ID
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {
                title: request.body.title,
                author: request.body.author,
                genre: request.body.genre,
                publicationYear: request.body.publicationYear
            },
            { new: true }  // This returns the updated document
        );

        // Handle case where the book is not found
        if (!updatedBook) {
            return response.status(404).send('Book not found');
        }

        // Return the updated book
        return response.status(200).json({
            message: 'Book updated successfully',
            updatedBook
        })

    } catch (error) {
        console.log(error.message);
        return response.status(500).send(error.message);
    }
});

/**
 * DELETE OPERATIONS
 */
// Delete a book by ID
router.delete('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) return response.status(404).send('Book not found');
        return response.status(200).json({
            message: 'Book deleted successfully',
            deletedBook
        })
        
    } catch (error) {
        console.log(error.message);
        return response.status(500).send(error.message);
    }
});

export default router;