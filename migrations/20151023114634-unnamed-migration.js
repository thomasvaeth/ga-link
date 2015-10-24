'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('links', 'url',
      {
        type: Sequelize.TEXT,
      }
    );

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('links', 'url',
      {
        type: Sequelize.STRING,
      }
    );
  }
};
