import gql from 'graphql-tag';

export default gql`
    mutation registerAsCustomer(
        $name: String!,
        $email: EmailAddress!,
        $password: String!
    ){
        registerAsCustomer(
            name: $name,
            email: $email,
            password: $password
        ) {
            accessToken
            refreshToken
        }
    }
`;