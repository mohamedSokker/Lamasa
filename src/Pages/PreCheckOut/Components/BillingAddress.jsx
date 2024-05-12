import React, { useState } from "react";

import TextInput from "../../../components/Fields/TextInput";
import SelectInput from "../../../components/Fields/SelectInput";

const BillingAddress = ({
  isSameAddress,
  setIsSameAddress,
  isDiffAddress,
  setIsDiffAddress,
}) => {
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [appartment, setAppartment] = useState("");
  const [city, setCity] = useState("");
  const [gavernorate, setGavernorate] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full  flex flex-col items-start justify-center ">
        <div
          className="w-full flex flex-row justify-between items-center p-3 rounded-t-md  border-[1px] "
          style={{
            backgroundColor: isSameAddress ? "rgb(219,234,254)" : "white",
            borderColor: isSameAddress ? "rgb(59,130,246)" : "rgb(209,213,219)",
          }}
        >
          <div className="flex flex-row gap-4">
            <input
              type="radio"
              id="address"
              name="address"
              checked={isSameAddress}
              onChange={() => {
                setIsSameAddress((prev) => !prev);
                setIsDiffAddress(false);
              }}
            />
            <p className="w-full">{`Same as shipping address`}</p>
          </div>
        </div>
      </div>

      <div className="w-full  flex flex-col items-start justify-center rounded-b-md ">
        <div
          className="w-full flex flex-row gap-4 p-3  border-[1px]"
          style={{
            borderBottomRightRadius: isDiffAddress ? "0" : "6px",
            borderBottomLeftRadius: isDiffAddress ? "0" : "6px",
            backgroundColor: isDiffAddress ? "rgb(219,234,254)" : "white",
            borderColor: isDiffAddress ? "rgb(59,130,246)" : "rgb(209,213,219)",
          }}
        >
          <input
            type="radio"
            id="address"
            name="address"
            checked={isDiffAddress}
            onChange={() => {
              setIsSameAddress(false);
              setIsDiffAddress((prev) => !prev);
            }}
          />
          <p className="w-full">{`Use a different billing address`}</p>
        </div>

        <div
          className="bg-gray-50 border-r-[1px] border-l-[1px] border-b-[1px] rounded-b-md border-gray-300 w-full flex flex-col justify-center items-center gap-4"
          style={{
            padding: isDiffAddress ? "12px" : "0",
            height: isDiffAddress ? "auto" : 0,
            maxHeight: "600px",
            borderBottomWidth: isDiffAddress ? "1px" : "0",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div className="w-full flex flex-col gap-4 overflow-hidden">
            <SelectInput
              options={["England"]}
              value={country}
              setValue={setCountry}
              placeHolder={`Country / Region`}
            />
            <div className="w-full flex md:flex-row flex-col md:justify-between text-[14px] md:items-center md:gap-4">
              <TextInput
                value={firstName}
                setValue={setFirstName}
                placeHolder={"First Name"}
              />

              <TextInput
                value={lastName}
                setValue={setLastName}
                placeHolder={"Last Name"}
              />
            </div>

            <div className="w-full flex justify-center items-center">
              <TextInput
                placeHolder={"Address"}
                value={address}
                setValue={setAddress}
              />
            </div>

            <div className="w-full flex justify-center items-center">
              <TextInput
                placeHolder={"Apartment, suite, etc, (optional)"}
                value={appartment}
                setValue={setAppartment}
              />
            </div>

            <div className="w-full flex md:flex-row flex-col md:justify-between text-[14px] md:items-center gap-4">
              <TextInput placeHolder={"City"} value={city} setValue={setCity} />
              <SelectInput
                value={gavernorate}
                setValue={setGavernorate}
                options={["Giza"]}
                placeHolder={`Governorate`}
              />
              <TextInput
                value={postalCode}
                setValue={setPostalCode}
                placeHolder={"Postal code"}
              />
            </div>

            <div className="w-full flex md:flex-row flex-col md:justify-between text-[14px] md:items-center md:gap-4">
              <TextInput
                placeHolder={"Phone"}
                value={phone}
                setValue={setPhone}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
