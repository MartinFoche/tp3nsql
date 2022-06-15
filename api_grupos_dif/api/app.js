let redis = require('redis');
let express = require('express');
let cors = require('cors');
let app= express();
let port = 4000;



// creamos cliente redis
const redisClient = redis.createClient(6379, "api_grupos_dif_db_1");

// Subscriptor
const sub = redis.createClient(6379, "api_grupos_dif_db_1");

/* const sub2 = redis.createClient(6379, "api_grupos_dif_db_1"); */

app.set('port',port);

app.use(express.json())
app.use(cors());

// Conexión cliente
redisClient.on('connect', function(){
    console.log('Cliente conectado a Redis Server');
});

redisClient.on('error', function(err){
    console.log(err);
});


// Conexión subscriptor
sub.on('connect', function(){
    console.log('Subscriptor conectado a Redis Server');
});

sub.on('error', function(err){
    console.log(err);
});

sub.on('message', (channel, message) => {
    console.log(`Received message from ${channel} channel.`);
    console.log(message);
});

// Subscripciones a canales default

/* sub2.subscribe('Becas', (message, channel) => {
    console.log('Canal: ', channel);
}); */

sub.subscribe('Mesas de exámen', (message, channel) => {
    console.log('Canal: ', channel);
});

sub.subscribe('Becas', (message, channel) => {
    console.log('Canal: ', channel);
});

sub.subscribe('Extensión', (message, channel) => {
    console.log('Canal: ', channel);
});

sub.subscribe('Deportes', (message, channel) => {
    console.log('Canal: ', channel);
});

sub.subscribe('Carreras Tics', (message, channel) => {
    console.log('Canal: ', channel);
});

sub.subscribe('Profesorados', (message, channel) => {
    console.log('Canal: ', channel);
});



app.post('/subscribir', (req, res) =>{
    try{
        let {canal}=req.body;

        sub.subscribe(`${canal}`, (message, channel) => {
            console.log('Canal: ', channel);
            const result = channel;
            res.json(result);
        });

        redisClient.pubsub('numsub', `${canal}`, (err, reply) => {
            if(err){
                console.log('Error: ', err);
            }else {
                console.log(reply);
            };
        });

    } catch (error) {
        console.log(error);
    ;}
});

app.post('/desubscribir/:canal', (req, res) =>{
    try {
        let {canal}=req.params;

        sub.unsubscribe(`${canal}`, (message, channel) => {
            console.log('Canal: ', channel);
            const result = channel;
            res.json(result);
        });


    } catch (error) {
        console.log(error);
    ;}
});

app.post('/publicar/:canal', (req, res) =>{
    try {
        let {message}=req.body;
        let {canal}=req.params;
        
        redisClient.publish(`${canal}`, `${message}`, (err, message) => {
            if(err){
                console.log(err);
            }else {
                const result = message;
                res.json(result);
            };
        });

    } catch (error) {
        console.log(error)
    };

});


app.get('/activos', (req, res) =>{
    try {
        redisClient.pubsub('channels', (err, channels) => {
            if(err){
                console.log('Error: ', err);
            }else {
                console.log(channels);
                const result = channels;
                res.json(result);
            };
        });

    } catch (error) {
        console.log(error)
    };
});

app.get('/activoscanal/:canal', (req, res) => {
    try {
        let {canal}=req.params;

        redisClient.pubsub('numsub', `${canal}`, (err, reply) => {
            if(err){
                console.log('Error: ', err);
            }else {
                console.log(reply);
                const result = reply;
                res.json(result);
            };
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(app.get('port'), (err)=> {
    console.log(`Server running on port ${app.get('port')}`)
})