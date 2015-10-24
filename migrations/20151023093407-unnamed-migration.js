'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('links', 'count',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    );


  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('links', 'count',
      {
        type: Sequelize.INTEGER,
      }
    );
  }
};
