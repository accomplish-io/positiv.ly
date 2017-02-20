var Sequelize = require('sequelize');
var db = new Sequelize('accomplish', 'root', '');

db.authenticate()
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
  start: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  number: Sequelize.INTEGER,
  units: Sequelize.STRING,
  due: Sequelize.DATE,
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

var Type = db.define('Type', {
  type: Sequelize.STRING
})

var Backer = db.define('Backer', {
  backerName: Sequelize.STRING,
  backerEmail: Sequelize.STRING,
});

var GoalBacker = db.define('GoalBacker', {
});

Goal.belongsTo(User);
User.hasMany(Goal);

Goal.belongsTo(Type);
Type.hasMany(Goal);

GoalBacker.belongsTo(Goal);
Goal.hasMany(Backer);

GoalBacker.belongsTo(Backer);
Backer.hasMany(GoalBacker);

Backer.belongsTo(User);
User.hasMany(Backer);

Goal.hasOne(Goal, {as: 'parent'});

User.sync();
Goal.sync();
Backer.sync();

exports.User = User;
exports.Goal = Goal;
exports.Backer = Backer;
