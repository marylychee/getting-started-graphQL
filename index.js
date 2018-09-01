'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A Video on a Egghead.io',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the video'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video in seconds'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether or not the viewer has watched the video'
    }
  },
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    video: {
      type: videoType,
      resolve: () => new Promise((resolve) => {
        // represent a video
        resolve({
          id: 'a',
          title: 'GraphQL',
          duration: 180,
          watched: false,
        })
      })
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  // mutation,
  // subscription
});

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

// graphql http middleware function
server.use('/graphql', graphqlHTTP({
  // config object
  schema, // schema above
  graphiql: true, // visual IDE
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
