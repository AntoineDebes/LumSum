import gql from 'graphql-tag';

export default gql`
    mutation loginWithSocial (
        $email: EmailAddress!,
        $name: String!,
        $url: String!,
        $role: Role!,
        $loginType: LoginType!
    ) {
        loginWithSocial(
            email:$email,
            name:$name,
            url:$url,
            role: $role,
            loginType: $loginType
        ) {
            accessToken
            refreshToken
        }
    }
`;