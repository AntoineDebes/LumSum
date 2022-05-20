import productImage from "@/assets/temp-images/product1.jpg";
import productImage2 from "@/assets/temp-images/product2.png";
import productImage3 from "@/assets/temp-images/product3.png";
import supplierLogo from "@/assets/temp-images/supplier.jpg";

export const supplier = {
  title: "ACME",
  about:
    "ACME is a well established brand in the middle east. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  logo: supplierLogo,
  location: "RAK",
  review: {
    rating: 3.3,
    count: 583,
  },
  details: [
    {
      title: "Employees",
      value: "10-100 people",
    },
    {
      title: "Delivery Regions",
      value: "Dubai",
    },
    {
      title: "Operation Times",
      value: "9 AM - 3 PM",
    },
    {
      title: "Business Type",
      value: "Retailer",
    },
  ],
  ratingDetail: {
    bad: 205,
    notGood: 982,
    good: 65,
    veryGood: 17,
    amazing: 46,
  },
  legacy: {
    value: 3,
    units: "YRS",
  },
  brands: ["MBM Gulf", "MIH", "AJX", "HMK", "JFF"],
  categories: ["Fire Rated Doors", "Formwork"],
  productImages: [
    {
      image: productImage2,
      alt: "gas range",
    },
    {
      image: productImage3,
      alt: "gas range",
    },
  ],
  url: "/",
  contactInfo: {
    address: "Umm Suqeim St, Abu Dhabi, UAE",
    phone: "+971 50 123 1231",
    mobile: "+971 50 471 4556",
    email: "info@rak.com",
    facebook: "rak@fb.com",
    instagram: "rak@insta.com",
    whatsapp: "+971 50 471 4556",
  },
};

export const productsData = [
  {
    name: "Black+Decker 111 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/1",
    price: 132.99,
    currency: "AED",
    image: { productImage },
    imageAlt: "Black and decker",
    review: {
      rating: 2.2,
      count: 444,
    },
  },
  {
    name: "Black+Decker 222 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/2",
    price: 132.99,
    currency: "AED",
    image: { productImage },
    imageAlt: "Black and decker",
    review: {
      rating: 2.2,
      count: 444,
    },
  },
  {
    name: "Black+Decker 333 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/3",
    price: 132.99,
    currency: "AED",
    image: { productImage },
    imageAlt: "Black and decker",
    review: {
      rating: 2.2,
      count: 444,
    },
  },
  {
    name: "Black+Decker 444 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/4",
    price: 132.99,
    currency: "AED",
    image: { productImage },
    imageAlt: "Black and decker",
    review: {
      rating: 2.2,
      count: 444,
    },
  },
  {
    name: "Black+Decker 555 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/5",
    price: 132.99,
    currency: "AED",
    image: { productImage },
    imageAlt: "Black and decker",
    review: {
      rating: 4.5,
      count: 222,
    },
  },
  {
    name: "Black+Decker 666 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/6",
    price: 132.99,
    currency: "AED",
    image: { productImage },
    imageAlt: "Black and decker",
    review: {
      rating: 2.2,
      count: 444,
    },
  },
  {
    name: "Black+Decker 777 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/7",
    price: 132.99,
    currency: "AED",
    image: { productImage },
    imageAlt: "Black and decker",
    review: {
      rating: 4.5,
      count: 222,
    },
  },
  {
    name: "Black+Decker 888 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/8",
    price: 132.99,
    currency: "AED",
    image: { productImage },
    imageAlt: "Black and decker",
    review: {
      rating: 2.2,
      count: 444,
    },
  },
];
