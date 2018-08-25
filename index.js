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
  video: Video
}
`);

const resolvers = {
  video: () => ({
    id: () => 1,
    title: () => 'bar',
    duration: () => 180,
    watched: () => true,
  })
}

const query = `
query myFirstQuery {
  video {
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
