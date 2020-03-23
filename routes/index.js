var express = require('express');
var router = express.Router();
const request = require("request")

 const apiKey = "1fb720b97cc13e580c2c35e1138f90f8"
//const apiKey = 123456789
const apiBaseUrl = 'https://api.themoviedb.org/3'
//const apiBaseUrl = 'http://localhost:3030'
const nowPlayingUrl = `${apiBaseUrl}/movie/popular?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req,res,next)=>{
  res.locals.imageBaseUrl = imageBaseUrl
  next()
})

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(nowPlayingUrl)
  request.get(nowPlayingUrl,(error, response, moviesData)=>{
    // console.log('=========error==========')
    // console.log(error)
    // console.log('=========response==========')
    // console.log(response)
    const parsedData = JSON.parse(moviesData)
    console.log(parsedData)
    res.render('index',{
      parsedData:parsedData.results
    })
  })
});

router.get("/movie/:id",(req, res, index)=>{
  const moviId = req.params.id
  const movieUrl = `${apiBaseUrl}/movie/${req.params.id}?api_key=${apiKey}`
 request.get(movieUrl,(error, response, movieData)=>{
  const parsedData = JSON.parse(movieData)
  res.render('single-movie',{
    parsedData:parsedData
  })
 })
})

router.post("/search",(req, res, next)=>{
 const userSearchTerm = encodeURI(req.body.movieSearch)
 const cat = req.body.cat
 request.get(`${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`,(error, response, movieData)=>{
   var parsedData = JSON.parse(movieData)
   if(cat==="person"){
    parsedData.results = parsedData.results[0].known_for
   }
   res.render('index',{
     parsedData : parsedData.results
   })
 })
})

module.exports = router;

