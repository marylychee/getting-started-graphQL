'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

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

const videoB = {
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

server.use('/graphql', graphqlHTTP({
  // config object
  schema,
  graphiql: true,
  rootValue: resolvers
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
