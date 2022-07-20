const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/movie_database');

const { STRING, INTEGER } = Sequelize;

const Movie = conn.define('movie', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

const Rating = conn.define('rating', {
  score: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  }
});

Rating.belongsTo(Movie, {as: 'score', foreignKey: 'movieId'});
Movie.hasMany(Rating, {as: 'scores'});

module.exports = {
  conn,
  Movie,
  Rating
};
