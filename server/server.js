const express = require('express')
const cors = require('cors')

const { graphqlHTTP } = require('express-graphql')
const gql = require('graphql-tag')
const { buildASTSchema } = require('graphql')
const { readFileSync } = require('fs')

const port = 5069;

const app = express()
app.use(cors())

const query = readFileSync('./graphql/schema.graphql').toString('utf-8');


const schema = buildASTSchema(gql(query))

const PEOPLE = new Map()
const POSTS = new Map()

class Post {
  constructor (data) { Object.assign(this, data) }
  get author () {
    return PEOPLE.get(this.authorId)
  }
}

class Person {
  constructor (data) { Object.assign(this, data) }
  get posts () {
    return [...POSTS.values()].filter(post => post.authorId === this.id)
  }
}

const rootValue = {
  posts: () => POSTS.values(),
  post: ({ id }) => POSTS.get(id),
  authors: () => PEOPLE.values(),
  author: ({ id }) => PEOPLE.get(id)
}

const initializeData = () => {
  const fakePeople = [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Doe' }
  ]

  fakePeople.forEach(person => PEOPLE.set(person.id, new Person(person)))

  const fakePosts = [
    { id: '1', authorId: '1', body: 'Hello world' },
    { id: '2', authorId: '2', body: 'Hi, planet!' }
  ]

  fakePosts.forEach(post => POSTS.set(post.id, new Post(post)))
}

initializeData()

app.use('/graphql', graphqlHTTP({ schema, rootValue }))

app.listen(port)
console.log(`Running a GraphQL API server at localhost:${port}/graphql`)
