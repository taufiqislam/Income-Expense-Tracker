const express = require('express');
require("./config/dbConnect");
const cors = require("cors");
const usersRoute = require('./routes/users/usersRoute');
const accountsRoute = require('./routes/accounts/accountsRoute');
const transactionsRoute = require('./routes/transactions/transactionsRoute');
const globalErrHandler = require('./middlewares/globalErrHandler');
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
//routes
app.use('/api/v1/users', usersRoute);

app.use('/api/v1/transactions', transactionsRoute);

app.use('/api/v1/accounts', accountsRoute);






//Error handlers
app.use(globalErrHandler);

//listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server is up and running on port ${PORT}`));