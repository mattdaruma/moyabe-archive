import { readFileSync } from 'fs'
import { join } from 'path'
import { Query, Mutation, Subscription } from './resolvers'
import { ApolloServer, gql, AuthenticationError } from 'apollo-server'
const SCHEMA = readFileSync(join(__dirname, 'schema.graphql')).toString('utf8')
const typeDefs = gql(SCHEMA)
const resolvers = {
  Query: Query,
  Mutation: Mutation,
  Subscription: Subscription
}
const userData = {
  display: 'My Test User', 
  identity: '6e1372e4-eba8-496a-870b-c8d9075fdf65',
  roles: ['ADMIN']
}
// const myUser = {
//   "identity": "6e1372e4-eba8-496a-870b-c8d9075fdf65",
//   "userId": "721378d1-d0d2-446d-86e2-fd913d9e1bd1",
//   "display": "Matt Morris",
//   "manageUsers": true,
//   "manageQueues": true
// }
async function launchServer(){
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}: {req: any}) => {
      let myDbUser = await Query.MyUser(null, null, {identity: userData}, null)
      return {user: myDbUser, identity: userData, roles: userData?.roles, amAdmin: true}
      // let token = req.headers[appConfig.jwtHeader];
      // user = decode(token, appConfig.jwtSecret);
    }
  });
  server.listen(4201).then(({ url }:{url: string}) => {
    console.log(`🚀 Server ready at ${url}`);
  })
}
launchServer()
