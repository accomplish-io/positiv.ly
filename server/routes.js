var homeHandle = require('./home.js');

module.exports = function(app, express, db, wk) {

  app.post('/api/auth', function(req, res) {
    db.User.findOrCreate({where: {
      email: req.body.email
    }})
      .then(function(user) {
        user[0].authId = req.body.name;
        user[0].save();
        res.send(user);
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
    db.User.findOne({
      where: {
        email: req.params.email
      }
    })
    .then(function (user) {
      db.Goal.findAll({
        where: {
          UserId: user.dataValues.id
        },
        include: [db.Progress]
      })
      .then(function(results) {
        res.send(results);
      });
    });
  });

  app.post('/api/goals/:email', function(req, res) {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    })
      .then(function(user) {
        db.Goal.create({
          UserId: user.id,
          goalName: req.body.goalName,
          public: req.body.public,
          GoalId: req.body.GoalId,
          number: req.body.number,
          units: req.body.units,
          due: req.body.due
        })
          .then(function(goal) {
            res.send(goal);
          });
      })
      .catch(function (error) {
        res.send(`Error: ${e}`);
      });
  });

  app.delete('/api/goal/:id', function(req, res) {
    db.Goal.destroy({
      where: { GoalId: req.params.id }
    })
      .then(function() {
        db.Goal.destroy({
          where: { id: req.params.id }
        });
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

  app.post('/api/progress/:goal', function(req, res) {
    db.Progress.create({
      GoalId: req.params.goal,
      number: req.body.number,
      date: req.body.date
    })
    .then(function() {
      db.Progress.findAll({
        where: {
          GoalId: req.params.goal
        }
      })
      .then(function(progressGoals) {
        db.Goal.findOne({
          where: {
            id: req.params.goal
          }
        })
        .then(function(goalTarget) {
          if (wk.compareToTarget(progressGoals, goalTarget)) {
            db.Goal.findOne({
              where: {
                id: req.params.goal
              }
            })
            .then(function(goal) {
              goal.update({complete: 1});
            });
          }
        });
      });
    })
    .then(function() {
      res.send();
    });
  });

  app.get('/api/progress/:goal', function(req, res) {
    db.Progress.findAll({
      where: {
        GoalId: req.params.goal
      }
    })
    .then(function(progress) {
      res.send(progress);
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
        if (req.body.complete === true) {
          //send email
          //delete backers
        }
        res.send(goal);
      });
  });

  app.get('/api/backers/:id', function(req, res) {
    db.Backer.findAll({
      where: {
        UserId: req.params.id
      }
    })
    .then(function(backers) {
      res.send(backers);
    });
  });

  app.post('/api/backers', function(req, res) {
    db.Backer.findOrCreate({
      where: {
        backerName: req.body.name,
        backerEmail: req.body.email,
        GoalId: req.body.GoalId,
        UserId: req.body.UserId
      }
    })
    .then(function(backer) {
      res.send(backer);
    });
  });

  app.post('/api/backers/email', function(req, res) {
    var backer = req.body.data[0]
    backerName = backer.backerName;
    backerEmail = backer.backerEmail;
    GoalId = backer.GoalId;
    UserId = backer.UserId;
    console.log(backer);
    console.log("****")
    console.log(GoalId);
    db.Goal.findOne({
      where: {
        id: GoalId
      },
      include: [db.User]
    })
    .then(function(goal) {
      //goal properties are goal.data
      //user properties are goal.data.User
      //ex. authId = goal.data.User.authId
      console.log(goal.User.email)
      res.send(goal);
    });
  });

  app.delete('/api/backers/:id', function(req, res) {
    db.Backer.destroy({
      where: { id: req.params.id }
    })
      .then(function() {
        res.send('Backer removed');
      });
  });

  app.post('/api/home', homeHandle);

};
