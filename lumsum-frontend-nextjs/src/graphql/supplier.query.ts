import gql from "graphql-tag";

export default gql`
    query getSupplierData($supplierId: ID!, $productId: ID!, $categoryId: ID!) {
        supplier(id: $supplierId) {
            id
            tradeName
            logo
            city
            areaWithInCity
            contactPerson
            landlineNumber
            mobileNumber
            website
            about
            likes
            facebook
            linkdin
            youtube
            location
            avgRating
            user {
                email
            }
            products {
                id
                name
                icon
                category {
                    id
                }
            }
            facebook
            linkdin
            youtube
            location
            images {
                id
                image
            }
        }
        product(id: $productId) {
            id
            name
        }
        category(id: $categoryId) {
            id
            name
        }
    }
`;
