import gql from 'graphql-tag';

export default gql`
    query product($id: ID!){
        product(id: $id) {
            id
            name
            description
            icon
            metaTitle
            metaDesc
            productText
            category {
                id
                name
            }
        }
    }
`;