import gql from 'graphql-tag';

export default gql`
    query productSearch(
        $whatAreYouLookingFor: String, 
        $category: String, 
        $city: String
    ) {
        productSearch(
            whatAreYouLookingFor: $whatAreYouLookingFor, 
            category: $category, 
            city: $city
        ) {
            id
            name
            icon
            category {
                id
                name
            }
        }
    }
`;