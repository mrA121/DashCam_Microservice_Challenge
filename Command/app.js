const express = require('express');
const bodyParser = require('body-parser');

const commandRoutes=require('./routes/command')

const app = express();
app.use(bodyParser.json());

app.use('/commands',commandRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

const PORT=3001
app.listen(PORT,()=>console.log(`Server started on the port${port}`))
