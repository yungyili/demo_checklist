const express = require('express');

const app = express();
require('./routes/authRoutes')(app);

app.get('/', (req,res)=>{
  res.send('Hi there');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
