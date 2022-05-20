import gql from 'graphql-tag';

export default gql`
    query categories {
        categories {
            id
            name
            icon
        }
    }
`;