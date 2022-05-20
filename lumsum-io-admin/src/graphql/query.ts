import { gql } from "@apollo/client";

export const ElieIsBack = gql`
  query elie {
    filterCategories(category: "") {
      id
      name
      categories {
        id
        name
      }
    }
  }
`;

export const COUNTS = gql`
  query counts {
    counts {
      users
      suppliers
      products
      reviews
    }
  }
`;

export const CATEGORIES = gql`
  query {
    categories(skip: 0, take: 20) {
      id
      name
      icon
    }
  }
`;

export const PRODUCTS = gql`
  query {
    products(skip: 0, take: 20) {
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

export const PRODUCT = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      name
      icon
      description
      metaTitle
      metaDesc
      productText
      category {
        id
        name
        icon
        description
      }
    }
  }
`;

export const CATEGORY = gql`
  query category($id: ID!) {
    category(id: $id) {
      id
      name
      description
      icon
      banner
      bannerMobile
      bannerUrl
      bannerActive
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

export const USERS = gql`
  query users {
    users {
      id
      name
      avatar
      user {
        email
      }
    }
  }
`;

export const SUPPLIERS = gql`
  query suppliers($search: String) {
    suppliers(search: $search) {
      id
      date
      tradeName
      legalName
      city
      areaWithInCity
      landlineNumber
      website
      contactPerson
      mobileNumber
      featured
      user {
        email
      }
      logo
      tradeLicense
      listingAgreement
    }
  }
`;

export const REVIEWS = gql`
  query reviews {
    reviews {
      id
      review
      rating
      reviewOn {
        id
        contactPerson
        tradeName
      }
      reviewBy {
        id
        name
      }
    }
  }
`;

export const SUPPLIER = gql`
  query supplier($id: ID!) {
    supplier(id: $id) {
      id
      date
      tradeName
      legalName
      city
      areaWithInCity
      landlineNumber
      mobileNumber
      contactPerson
      website
      logo
      about
      tradeLicense
      listingAgreement
      facebook
      linkdin
      youtube
      location
      user {
        email
      }
      images {
        id
        image
      }
    }
  }
`;

export const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      avatar
      user {
        email
      }
    }
  }
`;

export const GET_LEADER_BOARD_ADMIN = gql`
  query getLeaderBoardAdmin {
    getLeaderBoardAdmin {
      id
      name
      scores
      images
    }
  }
`;
