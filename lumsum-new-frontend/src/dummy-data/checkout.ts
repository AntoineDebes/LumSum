import iconMap from "@/assets/images/map-marker.svg";
import iconMasterCard from "@/assets/images/payment-options/mastercard.svg";
import productImage from "@/assets/temp-images/product1.jpg";
import supplierLogo from "@/assets/temp-images/supplier.jpg";

export const steps = [
  {
    title: "Step 1",
    description: "Address",
  },
  {
    title: "Step 2",
    description: "Payment",
  },
  {
    title: "Step 3",
    description: "Summary",
  },
];

export const data = {
  addresses: [
    {
      title: "Home",
      id: "1a",
      icon: iconMap,
      radio: {
        isPresent: true,
      },
      isDefault: true,
      info: [
        {
          title: "Name",
          text: "Mahmoud",
        },
        {
          title: "Address",
          text: "Umm Suqeim St - Dubai",
        },
        {
          title: "Phone",
          text: "+971-50-471-4556",
        },
      ],
    },
    {
      title: "Office",
      id: "2a",
      icon: iconMap,
      radio: {
        isPresent: true,
      },
      info: [
        {
          title: "Name",
          text: "Mahmoud Elsoukie",
        },
        {
          title: "Address",
          text: "Umm Suqeim St - Dubai",
        },
        {
          title: "Phone",
          text: "+971-50-471-4556",
        },
      ],
    },
  ],
  paymentOptions: [
    {
      title: "Card ending in 5618",
      id: "1p",
      icon: iconMasterCard,
      radio: {
        isPresent: true,
      },
      info: [
        {
          title: "Name",
          text: "Mahmoud",
        },
        {
          title: "Expires",
          text: "06/2025",
        },
        {
          title: "CVV/CVC",
          text: "",
          isInput: true,
        },
      ],
    },
    {
      title: "Card ending in 1001",
      id: "2p",
      icon: iconMasterCard,
      radio: {
        isPresent: true,
        isSelected: true,
      },
      info: [
        {
          title: "Name",
          text: "Mahmoud Elsoukie",
        },
        {
          title: "Expires",
          text: "06/2025",
        },
        {
          title: "CVV/CVC",
          text: "",
          isInput: true,
        },
      ],
    },
  ],
};

export const orderInfo = {
  orderNumber: 10023741234,
  isVerified: true,
  orderTotal: "AED 400",
  items: [
    {
      name: "Black+Decker 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
      url: "/",
      price: 132.99,
      currency: "AED",
      image: { productImage },
      imageAlt: "Black and decker",
      review: {
        verdict: "Very Good",
        count: 5083,
      },
      supplier: "ACME",
      supplierLogo: { supplierLogo },
      supplierLocation: "RAK",
      supplierReview: {
        verdict: "Very Good",
        count: 583,
      },
      supplierLegacy: {
        value: 3,
        units: "YRS",
      },
    },
    {
      name: "Black+Decker 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
      url: "/",
      price: 132.99,
      currency: "AED",
      image: { productImage },
      imageAlt: "Black and decker",
      review: {
        verdict: "Very Good",
        count: 5083,
      },
      supplier: "ACME",
      supplierLogo: { supplierLogo },
      supplierLocation: "RAK",
      supplierReview: {
        verdict: "Very Good",
        count: 583,
      },
      supplierLegacy: {
        value: 3,
        units: "YRS",
      },
    },
    {
      name: "Black+Decker 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
      url: "/",
      price: 132.99,
      currency: "AED",
      image: { productImage },
      imageAlt: "Black and decker",
      review: {
        verdict: "Very Good",
        count: 5083,
      },
      supplier: "ACME",
      supplierLogo: { supplierLogo },
      supplierLocation: "RAK",
      supplierReview: {
        verdict: "Very Good",
        count: 583,
      },
      supplierLegacy: {
        value: 3,
        units: "YRS",
      },
    },
    {
      name: "Black+Decker 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
      url: "/",
      price: 132.99,
      currency: "AED",
      image: { productImage },
      imageAlt: "Black and decker",
      review: {
        verdict: "Very Good",
        count: 5083,
      },
      supplier: "ACME",
      supplierLogo: { supplierLogo },
      supplierLocation: "RAK",
      supplierReview: {
        verdict: "Very Good",
        count: 583,
      },
      supplierLegacy: {
        value: 3,
        units: "YRS",
      },
    },
  ],
};
