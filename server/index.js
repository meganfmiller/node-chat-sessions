const express = require('express');
const bodyParser = require('body-parser');
const mc = require(`${__dirname}/controllers/messages_controller`);
const session = require('express-session');
const createInitialSession = require('./middlewares/session');
const filter = require('./middlewares/filter');

const app = express();

app.use(session({
    secret: "cmghreiakxsm4839fjxkwkerwi8",
    resave: false, //whether to re-save the cookie/overwrite every contact
    saveUninitialized: false, //add a cookie even if node thinks we don't need one
    cookie: { maxAge: 10000 } //how long until cookie expires
}))

app.use(createInitialSession);

app.use(bodyParser.json());

app.use(function(req, res, next){
    if(req.method === "POST" || req.method === "PUT") {
        filter(req, res, next);
    } else {
        next();
    }
})

app.use(express.static(`${__dirname}/../public/build`));


const messagesBaseUrl = "/api/messages";
app.post(messagesBaseUrl, mc.create);
app.get(messagesBaseUrl, mc.read);
app.get(messagesBaseUrl + "/history", mc.history);
app.put(`${messagesBaseUrl}`, mc.update);
app.delete(`${messagesBaseUrl}`, mc.delete);

const port = 3000;
app.listen(port, () => { console.log(`Server listening on port ${port}.`); });