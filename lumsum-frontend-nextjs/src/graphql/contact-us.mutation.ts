import gql from 'graphql-tag';

export default gql`
    mutation contactUs(
        $name: String!,
        $email: EmailAddress!,
        $phone: String!,
        $subject: String!,
        $message: String!
    ) {
        contactUs(
            name: $name,
            email: $email,
            phone: $phone,
            subject: $subject,
            message: $message
        )
    }
`;