const express = require('express');
const graphql = require('graphql');
const { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const PORT = 6969;

//to allow json, urlencoded middleware, to parse these request types.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//fetch data
const userData = require("./MOCK_DATA.json");

app.get('/', (req, res, next) => {
    res.send('<h1> Hello World </h1>'); //client browser
});

//create User Object Type
const UserType = new GraphQLObjectType({
    name: "User",

    //user object properties
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
});

const getOneUser = () => {
    //#pending
};

//create Root Object Type - every graphql has root object.
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",  //name root object

    //define routes
    fields: {

        //define route, generally all the GET queries
        getAllUsers: {
            type: new GraphQLList(UserType),    //list of "UserType" schema

            //fetching logic - all users
            resolve(parent, args) {
                res = getOneUser(args.id);
                return res;
            }
        },
        //define route, #pending to code
        getUser: {
            type: UserType,    //list of "UserType" schema
            args: {
                id: { type: GraphQLInt }
            },
            //fetching logic - all users
            resolve(parent, args) {


            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                userData.push(
                    {
                        id: userData.length + 1,
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email,
                        password: args.password
                    }
                );
                return args;
            }
        }
    }
});

const schema = new graphql.GraphQLSchema({ query: RootQuery, mutation: Mutation });

//run graphQL server
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true  //to have a nice interface for dev/testing, instead of using postman.
}));

app.listen(PORT, () => {
    console.log("Server running");  //node terminal console
});