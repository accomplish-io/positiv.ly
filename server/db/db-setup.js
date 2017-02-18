var Sequelize = require('sequelize');
var db = new Sequelize('accomplish', 'root', '');

Sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

var User = db.define('User', {
  nameFirst: Sequelize.STRING,
  nameLast: Sequelize.STRING,
  authId: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  start: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

var Goal = db.define('Goal', {
  goalName: Sequelize.STRING,
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  start: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

var Backer = db.define('Backer', {
  backerName: Sequelize.STRING,
  backerEmail: Sequelize.STRING,
});

Goal.belongsTo(User);
User.hasMany(Goal);

Backer.belongsTo(Goal);
Goal.hasMany(Backer);

Backer.belongsTo(User);
User.hasMany(Backer);

Goal.hasOne(Goal, {as: 'parent'});

User.sync();
Goal.sync();
Backer.sync();

exports.User = User;
exports.Goal = Goal;
exports.Backer = Backer;
