const path = require('path');
const { dir } = require('console');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
