import productImage from "@/assets/temp-images/product1.jpg";
import supplierLogo from "@/assets/temp-images/supplier.jpg";
import { OrderStatusType } from "@/typings/types";

export const products = [
  {
    name: "Black+Decker 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/account/orders/order",
    image: { productImage },
    imageAlt: "Black and decker",
    supplier: "ACME",
    supplierLogo: { supplierLogo },
    supplierLocation: "RAK",
    orderNumber: "2454632093222425",
    orderDate: "Sep 7, 2021",
    orderStatus: "processing" as OrderStatusType,
  },
  {
    name: "Black+Decker 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/account/orders/order",
    image: { productImage },
    imageAlt: "Black and decker",
    supplier: "ACME",
    supplierLogo: { supplierLogo },
    supplierLocation: "RAK",
    orderNumber: "245463209324252",
    orderDate: "Sep 7, 2021",
    orderStatus: "shipping" as OrderStatusType,
  },
  {
    name: "Black+Decker 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/account/orders/order",
    image: { productImage },
    imageAlt: "Black and decker",
    supplier: "ACME",
    supplierLogo: { supplierLogo },
    supplierLocation: "RAK",
    orderNumber: "245463209324215",
    orderDate: "Sep 7, 2021",
    orderStatus: "processing" as OrderStatusType,
  },
  {
    name: "Black+Decker 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
    url: "/account/orders/order",
    image: { productImage },
    imageAlt: "Black and decker",
    supplier: "ACME",
    supplierLogo: { supplierLogo },
    supplierLocation: "RAK",
    orderNumber: "245463209324245",
    orderDate: "Sep 7, 2021",
    orderStatus: "delivered" as OrderStatusType,
  },
];
