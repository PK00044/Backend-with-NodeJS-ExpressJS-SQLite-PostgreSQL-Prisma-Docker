import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// GET the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the file path
const __dirname = dirname(__filename);


// Middleware
app.use(express.json());
// serves the HTML file from the /public dir
// and also serves all the static files in the /public dir. Any requests for the CSS files will be resolve to the /public dir
app.use(express.static(path.join(__dirname, '../public')));

// Serving the HTLM file from the Public dir
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});






app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
