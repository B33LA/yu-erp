const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql', // ili 'postgres', 'sqlite', 'mssql' zavisno od baze
});

module.exports = sequelize;
