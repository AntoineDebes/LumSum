import gql from 'graphql-tag';

export default gql`
    query category($id: ID!) {
        category(id: $id){
            id
            name
            description
            icon
            banner
            bannerMobile
            bannerActive
            bannerUrl
            metaTitle
            metaDesc
            categoryText
            products {
                id
                name
                icon
            }
        }
    }
`;