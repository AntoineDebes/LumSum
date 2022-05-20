import create from "zustand";

export type PaymentCardsStore = {
  paymentCards: any;
  addPaymentCard: any;
  deletePaymentCard: any;
  // setAsDefaultPaymentCard: any;
};

const usePaymentCardsStore = create<PaymentCardsStore>((set) => ({
  paymentCards: [
    {
      id: "122206/2025",
      cardholderName: "Mahmoud Elsoukie",
      cardNumber: 1233122212221222,
      cardExpiry: "06/2025",
      cardCVV: 233,
      isDefault: true,
    },
    {
      id: "343206/2023",
      cardholderName: "Mahmoud",
      cardNumber: 2344345534553432,
      cardExpiry: "06/2023",
      cardCVV: 545,
    },
  ],

  addPaymentCard: (card: any) => {
    set((state) => ({
      paymentCards: [...state.paymentCards, card],
    }));
  },

  deletePaymentCard: (id: string) => {
    set((state) => ({
      paymentCards: [
        ...state.paymentCards.filter(
          (paymentCard: { id: string }) => paymentCard.id !== id
        ),
      ],
    }));
  },

  // setAsDefaultPaymentCard: (id: string) => {
  //   set((state) => ({
  //     paymentCards: [
  //       ...state.paymentCards.filter(
  //         (paymentCard: { id: string }) => paymentCard.id !== id
  //       ),
  //     ],
  //   }));
  // },
}));

export default usePaymentCardsStore;
