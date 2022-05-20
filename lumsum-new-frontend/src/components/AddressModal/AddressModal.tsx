import * as S from "./AddressModal.styled";
import * as Yup from "yup";

import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { Formik, FormikHelpers } from "formik";

import Box from "@/components/Box/Box";
import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import FormGroup from "@/components/FormGroup/FormGroup";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";
import PseudoFooter from "@/components/Modal/PseudoFooter/PseudoFooter";
import TextSwitch from "@/components/TextSwitch/TextSwitch";
import mapImage from "@/assets/images/mapImage.png";
import useAddressesStore from "@/store/useAddressesStore";
import { useState } from "react";

const containerStyle = {
  width: "800px",
  height: "480px",
  maxWidth: "100%",
  maxHeight: "100%",
};

const center = {
  lat: 25.168,
  lng: 55.25,
};

const AddressSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required"),
  lastName: Yup.string()
    .required("Required"),
  mobileNumber: Yup.string()
    .required("Required"),
  addressDetails: Yup.string()
    .required("Required"),
});

interface PersonalDetailsFormValues {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  mapLocation: string;
  addressDetails: string;
  addressType: string;
}

interface IProps {
  title: string;
  isAddressModalVisible: boolean;
  handleAddressModalOk: () => void;
  handleAddressModalCancel: () => void;
}

const AddressModal = ({
  title,
  isAddressModalVisible,
  handleAddressModalOk,
  handleAddressModalCancel,
}: IProps) => {
  const addAddress = useAddressesStore((state) => state.addAddress);

  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 });
  const [showMap, setShowMap] = useState(true);
  const [address, setAddress] = useState<{ name: string; address: any[] }>({
    name: "",
    address: [],
  });
  const [autoComplete, setautoComplete] = useState<any>({});

  const restrictions = {
    country: "ae",
  };

  return (
    <Modal
      title={title}
      visible={isAddressModalVisible}
      onOk={handleAddressModalOk}
      onCancel={handleAddressModalCancel}
      footer={null}
    >
      {showMap ? (
        <>
          <S.MapWrap>
            <LoadScript
              libraries={["places"]}
              googleMapsApiKey="AIzaSyDDxZLTsRoc-uMU0kwQOtzIc59IGRoSbTM"
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={(e) => {
                  setSelectedLocation({
                    lat: e.latLng!.lat(),
                    lng: e.latLng!.lng(),
                  });
                }}
              >
                <Autocomplete
                  restrictions={restrictions}
                  onLoad={(e) => {
                    setautoComplete(e);
                  }}
                  onPlaceChanged={() => {
                    const place = autoComplete.getPlace();
                    setSelectedLocation({
                      lat: place.geometry.location.lat(),
                      lng: place.geometry.location.lng(),
                    });
                    setAddress({
                      name: place.name,
                      address: [...place.address_components],
                    });
                  }}
                >
                  <S.MapLocationInput
                    type="text"
                    placeholder="Search your location"
                  />
                </Autocomplete>
                <Marker position={selectedLocation} />
                {address.name && (
                  <>
                    <S.AddressInMap>
                      <S.AddressInMapTitle>{address.name}</S.AddressInMapTitle>
                      {address.address?.map((line, index) => {
                        return (
                          <S.AddressInMapAddress key={line.long_name + index}>
                            {line.long_name}
                          </S.AddressInMapAddress>
                        );
                      })}
                      <S.AddressInMapButtonWrap>
                        <S.AddressInMapButton
                          theme="primary"
                          onClick={() => {
                            setShowMap(false);
                          }}
                        >
                          Next
                        </S.AddressInMapButton>
                      </S.AddressInMapButtonWrap>
                    </S.AddressInMap>
                  </>
                )}
              </GoogleMap>
            </LoadScript>
          </S.MapWrap>
        </>
      ) : (
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            mobileNumber: "",
            mapLocation: "",
            addressDetails: "",
            addressType: "",
          }}
          validationSchema={AddressSchema}
          onSubmit={(values, { resetForm }) => {
            addAddress({ ...values, addressFromMap: [address.name, ...address.address.map(item => item.long_name)] });
            resetForm({
              values: {
                firstName: "",
                lastName: "",
                mobileNumber: "",
                mapLocation: "",
                addressDetails: "",
                addressType: "",
              }
            });
            setAddress({
              name: "",
              address: [],
            });
            setShowMap(true);
            handleAddressModalOk();
          }}
        >
          {({ errors, touched, values }) => (
            <>
              <Form withPseudoFooter>
                <S.FormInnerWrap>
                  <Box title="Location Details" maxwidth="38rem">
                    <FormGroup
                      label="Map Location"
                      noInput
                      errors={errors}
                      touched={touched}
                    >
                      <S.MapSelectorWrap>
                        {address.name ? (
                          <ul>
                            <li>{address.name}</li>
                            {address.address?.map((line, index) => {
                              return <li key={line.long_name + index}>{line.long_name}</li>;
                            })}
                          </ul>
                        ) : (
                          "Choose location"
                        )}
                        <Button
                          theme="plain"
                          title="Choose Location"
                          onClick={() => {
                            setShowMap(true);
                          }}
                        >
                          <Image src={mapImage} width="40" height="60" />
                        </Button>
                      </S.MapSelectorWrap>
                    </FormGroup>
                    <FormGroup
                      label="Additional Address Details"
                      id="addressDetails"
                      placeholder="Apt number, building name, street name"
                      requiredField
                      errors={errors}
                      touched={touched}
                    />
                    <FormGroup
                      label="Address Label"
                      id="addressType"
                      requiredField
                      noInput
                      errors={errors}
                      touched={touched}
                    >
                      <TextSwitch
                        name="addressType"
                        id="addressType"
                        labels={["Home", "Projects"]}
                      />
                    </FormGroup>
                  </Box>
                  <Box title="Personal Details" maxwidth="38rem">
                    <FormGroup
                      label="First Name"
                      id="firstName"
                      placeholder="John"
                      requiredField
                      errors={errors}
                      touched={touched}
                    />
                    <FormGroup
                      label="Last Name"
                      id="lastName"
                      placeholder="Smith"
                      requiredField
                      errors={errors}
                      touched={touched}
                    />
                    <FormGroup
                      label="Mobile Number"
                      id="mobileNumber"
                      placeholder="+971"
                      requiredField
                      errors={errors}
                      touched={touched}
                    />
                  </Box>
                </S.FormInnerWrap>
                <PseudoFooter>
                  <Button key="submit" theme="primary" type="submit">
                    Save Changes
                  </Button>
                  <Button key="back" onClick={handleAddressModalCancel}>
                    Back
                  </Button>
                </PseudoFooter>
              </Form>
            </>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default AddressModal;