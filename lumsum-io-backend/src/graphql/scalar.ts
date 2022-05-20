import { URLResolver, EmailAddressResolver, NonEmptyStringResolver, PhoneNumberResolver } from 'graphql-scalars';
import { GraphQLUpload } from 'apollo-server-express';

export default {
    Upload: GraphQLUpload,
    URL: URLResolver,
    EmailAddress: EmailAddressResolver,
    NonEmptyString: NonEmptyStringResolver,
    PhoneNumber: PhoneNumberResolver
}