import { resolve } from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { GraphQLSchema } from 'graphql';

export {default as resolvers} from './resolvers';

export const schema: GraphQLSchema = loadSchemaSync(resolve(__dirname, 'schema', '*.graphql'), {
    loaders: [
        new GraphQLFileLoader()
    ]
});