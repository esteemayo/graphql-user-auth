import { makeExecutableSchema } from "graphql-tools";

import resolvers from "./resolvers";

const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
        token: String!
        username: String!
        gender: Gender
        createdAt: String!
    }

    enum Gender {
        MALE
        FEMALE
        OTHER
    }

    input RegisterInput {
        name: String!
        email: String!
        username: String!
        password: String!
        passwordConfirm: String!
        gender: Gender
    }

    type Query {
        getUsers: [User]
        getUser(id:ID) : User!
    }

    type Mutation {
        register(registerInput: RegisterInput) : User!
        login(email: String! password: String!) : User!
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
