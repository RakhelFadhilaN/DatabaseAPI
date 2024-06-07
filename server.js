const express = require('express');
const GoodReadingBookRoutes = require('./GoodReadingBook/routes');
const app = express();
const port = 3000; // Changed the port to 3000 or any available port

app.use(express.json());

app.get("/", (req, res) => {
    res.send('Hello World');
});

app.use("/api/v1/GoodReadingBook", GoodReadingBookRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
