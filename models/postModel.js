const PostModel = (sequelize, Sequelize) => {
  const post = sequelize.define(
    "posts",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timeStamps: true,
    }
  );
  return post;
};

export default PostModel;
