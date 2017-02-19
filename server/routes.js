module.exports = function(app, express, db) {
  //add routes and controller based on database endpoints

  app.post('/api/auth', function(req, res) {
    console.log('Attempting to create new user');
    //console.log('Reqest body: ', req.body);
    db.User.findOrCreate({where: {
      email: req.body.email,
      public: req.body.public || false,
    }})
      .then(function(user) {
        res.send(user)
      });
  });

  app.put('/api/users/:email', function(req, res) {
    db.User.findOne({
      where: {
       email: req.params.email
      }
    })
      .then(function(user) {
        user.update(req.body);
        res.send(user);
      });
  });

  app.get('/api/users/:email', function(req, res) {
    db.User.findOne({
      where: {
       email: req.params.email
      }
    })
      .then(function(user) {
        res.send(user);
      });
  });

  app.get('/api/goals/:email', function(req, res) {
    db.Goal.findAll({
      where: {
       email: req.params.email
      }
    })
      .then(function(results) {
        res.send(results);
      });
  });

  app.post('/api/goals/:email', function(req, res) {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    })
      .then(function(user) {
        // console.log('*******USER: ', user);
        db.Goal.create({
         UserId: user.id,
         goalName: req.body.goalName,
         public: req.body.public,
         parent: req.body.parent
        })
          .then(function(goal) {
            res.send(goal)
          });
      })
      .catch(function (error) {
        res.send(`Error: ${e}`)
      });
  });

  app.delete('/api/goal/:id', function(req, res) {
    db.Goal.destroy({
      where: { id: req.params.id }
    })
      .then(function() {
        res.send('Task deleted');
      });
  });

  app.get('/api/goal/:id', function(req, res) {
    db.Goal.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(goal) {
        res.send(goal);
      });
  });

  app.put('/api/goal/:id', function(req, res) {
    db.Goal.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(goal) {
        goal.update(req.body);
        res.send(goal);
      });
  });
}