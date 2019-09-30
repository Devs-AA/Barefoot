// define the Login model with its content
const Logouts = (sequelize, DataTypes) => {
  const Logout = sequelize.define('logouts', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    invalidToken: {
      type: DataTypes.STRING(5000),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Actual token is required'
        }
      }
    }
  });

  return Logout;
};

export default Logouts;
