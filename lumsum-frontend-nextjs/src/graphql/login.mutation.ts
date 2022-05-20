import gql from 'graphql-tag';

export default gql`
    mutation login($email: EmailAddress!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            refreshToken
        }
    }
`;