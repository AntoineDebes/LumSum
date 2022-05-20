import productImage from "@/assets/temp-images/product1.jpg";

export const product = {
  name: "Black+Decker 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
  url: "/",
  image: { productImage },
  imageAlt: "Black and decker",
  supplier: "ACME",
  orderDate: "Sep 7, 2021",
  orderNumber: "24546320932425",
  shippingAddress: {
    name: "Mahmoud Elsoukie",
    street: "Umm Suqeim St",
    city: "Dubai",
  },
  phone: "+971-50-471-4556",
  card: {
    cardNumber: 5618,
    company: "master",
  },
};

export const orderSummary = {
  currency: "AED",
  subtotal: 400,
  shippingFee: 0,
  total: 420,
};
