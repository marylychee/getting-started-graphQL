'use strict';

const { graphql, buildSchema } = require('graphql');

// query feild type of foo which is a type of string
const schema = buildSchema(`
type Video {
  id: ID,
  title: String,
  duration: Int,
  watched: Boolean
}

type Query {
  video: Video,
  videos: [Video]
}
`);

const videoA = {
  id: 'a',
  title: 'Create a GraphQL Schema',
  duration: 12,
  watched: true,
}

const videoB + {
  id: 'b',
  title: 'Ember.js CLI',
  duration: 240,
  watched: false,
}

const videos = [videoA, videoB];

const resolvers = {
  video: () => ({
    id: () => 1,
    title: () => 'bar',
    duration: () => 180,
    watched: () => true,
  }),
  videos: () => videos,
};

const query = `
query myFirstQuery {
  videos {
    id,
    title,
    duration,
    watched
  }
}
`
graphql(schema, query, resolvers)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
