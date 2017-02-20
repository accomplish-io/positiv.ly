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

var Frequency = db.define('Frequency', {
  Monday: Sequelize.BOOLEAN,
  Tuesday: Sequelize.BOOLEAN,
  Wednesday: Sequelize.BOOLEAN,
  Thursday: Sequelize.BOOLEAN,
  Friday: Sequelize.BOOLEAN,
  Saturday: Sequelize.BOOLEAN,
  Sunday: Sequelize.BOOLEAN,
  weekly: Sequelize.BOOLEAN,
  biweekly: Sequelize.BOOLEAN,
  monthly: Sequelize.BOOLEAN,
  monthDay: Sequelize.INTEGER,
  weekNum: Sequelize.INTEGER
});

var Backer = db.define('Backer', {
  backerName: Sequelize.STRING,
  backerEmail: Sequelize.STRING,
});

var GoalBacker = db.define('GoalBacker', {
});

var Session = db.define('Session', {
  start: Sequelize.DATE,
  end: Sequelize.END
});

var GoalSession = db.define('GoalSession', {
});

Goal.belongsTo(User);
User.hasMany(Goal);

Goal.belongsTo(Frequency);
Frequency.hasMany(Goal);

GoalBacker.belongsTo(Goal);
Goal.hasMany(Backer);

GoalBacker.belongsTo(Backer);
Backer.hasMany(GoalBacker);

GoalSession.belongsTo(Goal);
Goal.hasMany(Session);

GoalSession.belongsTo(Session);
Session.hasMany(GoalSession);

Backer.belongsTo(User);
User.hasMany(Backer);

Goal.hasOne(Goal, {as: 'parent'});

User.sync();
Goal.sync();
Frequency.sync();
Backer.sync();
GoalBacker.sync();
Session.sync();
GoalSession.sync();

exports.User = User;
exports.Goal = Goal;
exports.Type = Type;
exports.Frequency = Frequency;
exports.Backer = Backer;
exports.GoalBacker = GoalBacker;
exports.Session = Session;
exports.GoalSession = GoalSession;
