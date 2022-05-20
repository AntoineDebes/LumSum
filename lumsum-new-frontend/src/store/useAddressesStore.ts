import create from "zustand";

export type AddressesStore = {
  addresses: any;
  addAddress: any;
  deleteAddress: any;
  updateAddress: any;
  // setAsDefaultAddress: any;
};

const useAddressesStore = create<AddressesStore>((set) => ({
  addresses: [
    {
      id: "SDGCatering",
      firstName: "Mahmoud",
      lastName: "Elsoukie",
      mobileNumber: +971552342342,
      addressType: "Home",
      addressFromMap: [
        "SDG Catering",
        "Al Khabaisi",
        "Dubai",
        "United Arab Emirates",
      ],

      addressDetails: "Room: 3423, Building: 2323",
      isDefault: true,
    },
    {
      id: "RokiakCatering",
      firstName: "Mahmoud",
      lastName: "Elsoukie",
      mobileNumber: +971552342342,
      addressType: "Home",
      addressFromMap: [
        "Rokiak Catering",
        "Al Khabaisi",
        "Dubai",
        "United Arab Emirates",
      ],
      addressDetails: "Room: 3423, Building: 2323",
    },
  ],

  addAddress: (card: any) => {
    set((state) => ({
      addresses: [...state.addresses, card],
    }));
  },

  updateAddress: (id: string, data: {}) => {
    set((state) => {
      const match = state.addresses.findIndex(
        (address: { id: string }) => address.id === id
      );
      const current = [...state.addresses];
      current[match] = { ...current[match], data: data };
      return {
        addresses: current,
      };
    });
  },

  deleteAddress: (id: string) => {
    set((state) => ({
      addresses: [
        ...state.addresses.filter(
          (address: { id: string }) => address.id !== id
        ),
      ],
    }));
  },

  getAnAddress: (id: string, data: []) => {
    set((state) => {
      const match = state.addresses.findIndex(
        (address: { id: string }) => address.id === id
      );
      const current = [...state.addresses];
      current[match] = { ...current[match], data: data };
      return {
        addresses: current,
      };
    });
  },

  // setAsDefaultAddress: (id: string) => {
  //   set((state) => ({
  //     addresses: [
  //       ...state.addresses.filter(
  //         (address: { id: string }) => address.id !== id
  //       ),
  //     ],
  //   }));
  // },
}));

export default useAddressesStore;
