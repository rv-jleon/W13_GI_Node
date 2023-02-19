const express = require('express')
const path = require('path')
const app = express()
const { engine } = require('express-handlebars')
const request = require('request')
const bodyParser = require('body-parser')


const PORT = process.env.PORT || 5500

// set middleware
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
// set middleware for body parser
app.use(bodyParser.urlencoded({extended:false}))

// make a request API
// api key: pk_de72058f3cf24bada9cc1576bbe0a0f7
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_de72058f3cf24bada9cc1576bbe0a0f7', {json: true}, (err, res, body) => {
        if (err) {
            return console.log(err)
        }
        if (res.statusCode === 200) {
            finishedAPI(body)
        }
    })
}

app.get('/', function (req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        })
    })
})

app.post('/', function (req, res) {
    call_api(function(doneAPI) {
        posted_stuff = req.body.stock_ticker,
        res.render('home', {
            stock: doneAPI
        })
    }, req.body.stock_ticker)
})

app.get('/info', function (req, res) {
    res.render('info')
})

app.use(express.static(path.join(__dirname, 'public')))
// set static path
app.listen(PORT, () => console.log(`listening on ${PORT}`))










// const express = require("express");
// const path = require('path');
// const app = express();
// const { engine } = require('express-handlebars');
// const request = require('request');
// const bodyParser = require('body-parser');


// // creates a port for our server
// const PORT = process.env.PORT || 7000;

// // set middleware
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');
// //set middleware for body parser
// app.use(bodyParser.urlencoded({extended:false}));

// // make a request API 
// function call_api(finishedAPI, ticker){
//     request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_de72058f3cf24bada9cc1576bbe0a0f7', {json:true},(err,res,body)=>{
//         if(err){return console.log(err);}
//         if(res.statusCode === 200){finishedAPI(body)};
//     });
// };


// //Set handlebar routes
// app.get('/', function (req, res){
//     call_api(function(doneAPI) {
//       res.render('home', { 
//       stock: doneAPI
//       });
//     });
// });

// // create post route
// app.post('/', function (req, res){
//     call_api(function(doneAPI) {
//       posted_stuff = req.body.stock_ticker; // grabbing the name attribute
//       res.render('home', { 
//       stock: doneAPI
//     //   posted_stuff: posted_stuff
//       });
//     }, req.body.stock_ticker);  // adding ticker as an argument
// });

// app.get('/info', function (req, res){
//     res.render('info');
// });
// // app.get('/', (req, res) => {
// //     res.render('home');
// // });

// // set static path
// app.use(express.static(path.join(__dirname, 'public')));


// app.listen(PORT, ()=> console.log('listening on ' + PORT));