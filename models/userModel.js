//defining the structure of the table
const UserModel = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      city: {
        type: Sequelize.STRING,
      },
    },
    {
      timeStamps: true,
    }
  );

  return user;
};

export default UserModel;
