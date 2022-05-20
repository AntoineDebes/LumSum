import create from "zustand";
import productImage from "@/assets/temp-images/product1.jpg";

export type CartItemsStore = {
  cartItems: {
    name: string;
    image: any;
    imageAlt: string;
    supplier: string;
    price: number;
    currency: string;
    quantity: number;
    id: string;
  }[];
  addCartItem: any;
  updateQuantity: any;
  deleteCartItem: any;
};

const useCartItemsStore = create<CartItemsStore>((set) => ({
  cartItems: [
    {
      name: "Black+Decker 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
      image: { productImage },
      imageAlt: "Black and decker",
      supplier: "ACME",
      price: 390,
      currency: "AED",
      quantity: 2,
      id: "BD154",
    },
    {
      name: "Carcher 154 Pieces Hand Tool Kit for Home & Office Use, Orange/Black",
      image: { productImage },
      imageAlt: "Black and decker",
      supplier: "ACME",
      price: 390,
      currency: "AED",
      quantity: 1,
      id: "CAR154",
    },
  ],
  addCartItem: (item: any) => {
    set((state) => ({
      cartItems:
        state.cartItems.findIndex(({ id }: any) => id === item.id) !== -1
          ? state.cartItems
          : [...state.cartItems, item],
    }));
  },

  updateQuantity: (id: string, quantity: number) => {
    set((state) => {
      const match = state.cartItems.findIndex(
        (cartItem: { id: string }) => cartItem.id === id
      );
      const current = [...state.cartItems];
      current[match] = { ...current[match], quantity: quantity };
      return {
        cartItems: current,
      };
    });
  },

  deleteCartItem: (id: string) => {
    set((state) => ({
      cartItems: [
        ...state.cartItems.filter(
          (cartItem: { id: string }) => cartItem.id !== id
        ),
      ],
    }));
  },
}));

export default useCartItemsStore;
