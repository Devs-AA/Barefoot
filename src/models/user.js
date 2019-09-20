const users = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dateOfBirth: {
      type: DataTypes.DATE
    },
    preferredLanguage: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING,
    },
    preferredCurrency: {
      type: DataTypes.STRING,
    },
    residentialLocation: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.STRING
    },
    saveProfile: {
      type: DataTypes.BOOLEAN
    },
    countryCode: {
      type: DataTypes.STRING
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5
    },
    lineManager: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });

  User.associate = (models) => {
    User.hasOne(models.logins, {
      foreignKey: 'email',
      onDelete: 'CASCADE',
    });

    User.hasOne(models.resets, {
      foreignKey: 'email',
      onDelete: 'CASCADE',
    });
  };

  return User;
};

export default users;
