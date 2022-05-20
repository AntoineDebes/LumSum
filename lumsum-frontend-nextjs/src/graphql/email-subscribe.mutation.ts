import gql from 'graphql-tag';

export default gql`
    mutation subscribe($email: EmailAddress!){
        subscribe(email: $email)
    }
`;