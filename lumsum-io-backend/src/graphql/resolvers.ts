import { resolve } from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import scalar from './scalar';

const resolversArray = loadFilesSync(resolve(__dirname, '..', 'services', '**', 'resolvers','*'));

resolversArray.unshift(scalar);

export default mergeResolvers(resolversArray);