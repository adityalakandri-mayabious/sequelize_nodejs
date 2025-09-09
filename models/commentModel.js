const CommentModel = (sequelize, Sequelize) => {
  const comment = sequelize.define(
    "comment",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      postId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  return comment;
};

export default CommentModel;