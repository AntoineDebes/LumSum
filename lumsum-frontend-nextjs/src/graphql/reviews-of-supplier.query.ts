import gql from 'graphql-tag';

export default gql`
    query getReviewsOfSupplier($id:ID!) {
        getReviewsOfSupplier(id: $id) {
            id
            review
            rating
            createdAt
            reviewBy {
                id
                name
                avatar
            }
        }
    }
`;