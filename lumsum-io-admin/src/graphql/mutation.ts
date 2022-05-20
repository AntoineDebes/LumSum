import { gql } from "@apollo/client";

export const LOGIN_AS_ADMIN = gql`
  mutation loginAsAdmin($email: EmailAddress!, $password: String!) {
    loginAsAdmin(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory(
    $id: ID!
    $name: String!
    $desc: String!
    $icon: String!
    $banner: String
    $bannerMobile: String
    $bannerUrl: String
    $bannerActive: Boolean!
    $metaTitle: String!
    $metaDesc: String!
    $categoryText: String
  ) {
    addCategory(
      id: $id
      name: $name
      desc: $desc
      icon: $icon
      banner: $banner
      bannerMobile: $bannerMobile
      bannerUrl: $bannerUrl
      bannerActive: $bannerActive
      metaTitle: $metaTitle
      metaDesc: $metaDesc
      categoryText: $categoryText
    ) {
      id
      name
      icon
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory(
    $id: ID!
    $name: String!
    $description: String!
    $icon: String!
    $banner: String
    $bannerMobile: String
    $bannerUrl: String
    $bannerActive: Boolean!
    $metaTitle: String!
    $metaDesc: String!
    $categoryText: String
  ) {
    updateCategory(
      id: $id
      name: $name
      desc: $description
      icon: $icon
      banner: $banner
      bannerMobile: $bannerMobile
      bannerUrl: $bannerUrl
      bannerActive: $bannerActive
      metaTitle: $metaTitle
      metaDesc: $metaDesc
      categoryText: $categoryText
    ) {
      id
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $id: ID!
    $categoryId: ID!
    $name: String!
    $desc: String!
    $icon: String!
    $metaTitle: String!
    $metaDesc: String!
    $productText: String
  ) {
    addProduct(
      id: $id
      categoryId: $categoryId
      name: $name
      desc: $desc
      icon: $icon
      metaTitle: $metaTitle
      metaDesc: $metaDesc
      productText: $productText
    ) {
      id
      name
      icon
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $categoryId: ID!
    $name: String!
    $description: String!
    $icon: String!
    $metaTitle: String!
    $metaDesc: String!
    $productText: String
  ) {
    updateProduct(
      id: $id
      categoryId: $categoryId
      name: $name
      desc: $description
      icon: $icon
      metaTitle: $metaTitle
      metaDesc: $metaDesc
      productText: $productText
    ) {
      id
      name
      icon
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation removeCategory($id: ID!) {
    removeCategory(id: $id) {
      id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation removeProduct($id: ID!) {
    removeProduct(id: $id) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation removeReview($id: ID!) {
    removeReview(id: $id)
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $email: EmailAddress!
    $name: NonEmptyString!
    $avatar: String!
  ) {
    addUser(email: $email, name: $name, avatar: $avatar)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $email: EmailAddress!
    $name: NonEmptyString!
    $avatar: String!
  ) {
    updateUser(id: $id, email: $email, name: $name, avatar: $avatar)
  }
`;

export const ADD_SUPPLIER = gql`
  mutation addSupplier(
    $email: EmailAddress!
    $date: String!
    $tradeName: NonEmptyString!
    $legalName: NonEmptyString!
    $city: NonEmptyString
    $areaWithInCity: NonEmptyString
    $contactPerson: NonEmptyString!
    $landlineNumber: String
    $mobileNumber: String
    $website: URL
    $scialMediaLinks: SocialMediaLinks
    $about: String
    $products: [ID!]!
    $logo: String!
    $tradeLicense: String
    $listingAgreement: String
  ) {
    addSupplier(
      email: $email
      date: $date
      tradeName: $tradeName
      legalName: $legalName
      city: $city
      areaWithInCity: $areaWithInCity
      contactPerson: $contactPerson
      landlineNumber: $landlineNumber
      mobileNumber: $mobileNumber
      website: $website
      socialMediaLinks: $scialMediaLinks
      about: $about
      products: $products
      logo: $logo
      tradeLicense: $tradeLicense
      listingAgreement: $listingAgreement
    )
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation updateSupplier(
    $id: ID!
    $email: EmailAddress!
    $date: String!
    $tradeName: NonEmptyString!
    $legalName: NonEmptyString!
    $city: NonEmptyString
    $areaWithInCity: NonEmptyString
    $contactPerson: NonEmptyString!
    $landlineNumber: String
    $mobileNumber: String
    $website: URL
    $scialMediaLinks: SocialMediaLinks
    $about: String
    $logo: String!
    $tradeLicense: String
    $listingAgreement: String
  ) {
    updateSupplier(
      id: $id
      email: $email
      date: $date
      tradeName: $tradeName
      legalName: $legalName
      city: $city
      areaWithInCity: $areaWithInCity
      contactPerson: $contactPerson
      landlineNumber: $landlineNumber
      mobileNumber: $mobileNumber
      website: $website
      socialMediaLinks: $scialMediaLinks
      about: $about
      logo: $logo
      tradeLicense: $tradeLicense
      listingAgreement: $listingAgreement
    )
  }
`;

export const REMOVE_SUPPLIER = gql`
  mutation removeSupplier($id: ID!) {
    removeSupplier(id: $id)
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id)
  }
`;

export const ADD_IMAGE_SUPPLIER = gql`
  mutation addImageOfSupplier($id: ID!, $image: String!) {
    addImageOfSupplier(id: $id, image: $image)
  }
`;

export const DELETE_SUPPLIER_IMAGE = gql`
  mutation deleteSupplierImage($id: ID!) {
    deleteSupplierImage(id: $id)
  }
`;

export const ADD_TO_LEADER_BOARD = gql`
  mutation addToLeaderBoard($name: String!, $scores: Int!, $images: Int!) {
    addToLeaderBoard(name: $name, scores: $scores, images: $images)
  }
`;

export const DELETE_FROM_LEADER_BOARD = gql`
  mutation deleteFromLeaderBoard($id: ID!) {
    deleteFromLeaderBoard(id: $id)
  }
`;

export const UPDATE_LEADER_BOARD = gql`
  mutation updateLeaderBoard(
    $id: ID!
    $name: String!
    $scores: Int!
    $images: Int!
  ) {
    updateLeaderBoard(id: $id, name: $name, scores: $scores, images: $images) {
      id
      name
      scores
      images
    }
  }
`;
