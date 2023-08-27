const express = require('express');
const cors = require('cors')
const connectDB = require('./SubsWS/configs/db')

/// /// Subs WS ::
const MembersRouter = require('./SubsWS/Routers/MembersRouter');
const MoviesRouter = require('./SubsWS/Routers/MoviesRouter');
const SubRouter = require('./SubsWS/Routers/SubRouter');

/// /// Cinema WS ::
const UsersJSRouter = require('./CinemaWS/Router/UsersJSRouter');
const PermsRouter = require('./CinemaWS/Router/PermsRouter');
const UsersDBRouter = require('./CinemaWS/Router/UsersDBRouter');

// auth router ::
const authRouter = require('./CinemaWS/Router/authRouter');



connectDB()

const app = express();
const port = 8001;

app.use(cors())

app.use(express.json());

// auth ::
app.use('/auth', authRouter);
// Subs WS routers ::
app.use('/members', MembersRouter);
app.use('/movies', MoviesRouter);
app.use('/subs', SubRouter);
// Cinema WS routers ::
app.use('/users', UsersJSRouter);
app.use('/perms', PermsRouter);
app.use('/usersDB', UsersDBRouter);


app.listen(
  port,
  () => console.log(`app is listening at http://localhost:${port}`)
);