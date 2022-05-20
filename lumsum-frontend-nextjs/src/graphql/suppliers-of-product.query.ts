import gql from "graphql-tag";

export default gql`
  query getSuppliersOfProduct($id: ID!, $city: String) {
    getSuppliersOfProduct(id: $id, city: $city) {
      id
      tradeName
      city
      areaWithInCity
      logo
      avgRating
      featured
      likes
    }
  }
`;
