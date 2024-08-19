import express from 'express';
import { PORT } from './config.js'; // Ensure PORT is being exported as a named export

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
