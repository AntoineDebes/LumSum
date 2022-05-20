import gql from 'graphql-tag';

export default gql`
    query counts {
        counts {
            visitors
            users
            suppliers
            products
            reviews
        }
    }
`;