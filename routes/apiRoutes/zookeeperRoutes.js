const router = require('express').Router();
const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers');

// get method requires two arguments The first is a string that describes the route the client will have to fetch from. The second is a callback function that will execute every time that route is accessed with a GET request.
router.get('/zookeepers', (req, res) => {
  // res parameter (short for response)
  // req parameter (short for request)
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
  const result = findById(req.params.id, zookeepers);
  if (result) {
    res.json(result);
  }
  else {
    res.send(404);
  }
});

router.post('/zookeepers', (req, res) => {
  // req.body is where our incoming content will be
  // set id based on what the next index of the array will be
  req.body.id = zookeepers.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateZookeeper(req.body)) {
    res.status(400).send('The zookeeper is not properly formatted.');
  } else {
    // add zookeeper to json file and animals array in this function
    const zookeeper = createNewZookeeper(req.body, zookeepers);
    res.json(zookeeper);
  }

});

module.exports  = router;