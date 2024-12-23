const express = require('express');
const appController = require('./appController');
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');

// Initialize app
const app = express();
const PORT = envVariables.PORT || 65535;

// Middleware
app.use(express.static('public'));  // Serve static files from 'public' directory
app.use(express.json());            // Parse incoming JSON payloads

// Serve index.html as the default page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route for dynamic page serving (optional)
app.get('/page/:pageName', (req, res) => {
    const pageName = req.params.pageName;
    res.sendFile(__dirname + `/public/${pageName}.html`);
});

// Mount the router
app.use('/', appController);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
