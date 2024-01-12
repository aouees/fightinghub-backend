const express = require('express');
const app = express();
const compression = require('compression')
const authRouter = require('./routes/authenticate')
const registerRourter = require('./routes/register')
app.use(express.static('./public'))
app.set('view engine', 'ejs');

app.use(express.json());
app.use(compression());


app.use('/login', authRouter)
app.use('/register', registerRourter)

app.get('/', function (req, res) {
  res.render('pages/auth');
});

// for handling oauth2 in google
app.get('/success', (req, res) => res.send(req.session.passport.user));
app.get('/error', (req, res) => res.send("error logging in by google"));

app.listen(3000, () => console.log('App run http://localhost:3000'));
