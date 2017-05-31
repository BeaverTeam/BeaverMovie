var express = require('express');
var router = express.Router();
const rp = require('request-promise');

const optionsForMovies = {
    method: 'GET',
    uri: 'http://api.douban.com/v2/movie/in_theaters',
    json: true 
};

function getMovieOption(id) {
  return {
    method: 'GET',
    uri: 'http://api.douban.com/v2/movie/subject/' + id,
    json: true 
  }
}

router.get('/', (req, res, next) => {
  rp(optionsForMovies)
    .then(body => {
      movies = [];
      body.subjects.forEach(function(element) {
        var temp = "";
        for (var genre of element.genres)
          temp += genre + " ";

        movies.push({
          rating: element.rating.average,
          genres: temp,
          original_title: element.original_title,
          title: element.title,
          image: element.images.medium,
          id: element.id
        })
      }, this);
      res.json({state: 'success', movies: movies});
    })
    .catch(error => {
      res.json({state: 'failed', err: error});
    })
});

router.get('/movieItem/:id', (req, res, next) => {
  rp(getMovieOption(req.params.id))
    .then(body => res.json({state: 'success', data: body}))
    .catch(error => res.json({state: 'failed', err: error}));
});

module.exports = router;
