// define the Reset model with its content
const resets = (sequelize, DataTypes) => {
  const Reset = sequelize.define('resets', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    resetToken: {
      type: DataTypes.STRING,
      unique: true
    },
    expireTime: {
      type: DataTypes.DATE
    }
  });

  Reset.associate = (models) => {
    Reset.belongsTo(models.users, {
      foreignKey: 'email',
    });
  };

  return Reset;
};

export default resets;
