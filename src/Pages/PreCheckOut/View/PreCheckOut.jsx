import React, { useEffect, useState } from "react";
import { RxLockClosed } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import logo from "../../../assets/logo.jpg";
import { useMainContext } from "../../../contexts/MainContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import "../../CartCard/Style/style.css";
import TextInput from "../../../components/Fields/TextInput";
import SelectInput from "../../../components/Fields/SelectInput";
import PaymentMethod from "../Components/PaymentMethod";
import BillingAddress from "../Components/BillingAddress";
import SubscriptionPolicy from "../Components/SubscriptionPolicy";
import PayNow from "../Components/PayNow";

const subscriptionPolicy = `Cancellation Policy
Some items in our store may be offered to you as a subscription, a pre-order or try before you buy. This cancellation policy lays out how you can change or cancel these kinds of purchases.
Subscriptions
When you purchase a subscription you'll receive repeat deliveries. These are based on the subscription duration and frequency that you select.
Your payment details will be stored securely and you'll be charged for each of these deliveries, unless you choose to pay in advance.
Some subscriptions may auto-renew at the end of their duration. If you don't want to renew a subscription you can cancel it.
If you want to cancel or change your subscription, you can do it at any time. Your order confirmation emails have links to your order. You can manage your subscription from there.
See our returns policy for more details on returns and refunds.
Pre-orders
When you purchase a pre-order, you are buying an out-of-stock or soon-to-be-available product not yet in inventory. We may collect no payment or a partial deposit at checkout, store your payment method, then fulfill and charge the full or remaining payment at a future date.
You can cancel a partially paid pre-order order that has not yet been fulfilled. If the order has been fulfilled, then you can't cancel the order, but you can request a full or partial refund. See our returns policy for more details on returns and refunds.
Try before you buy
When you purchase a try before you buy item, we authorize your payment method before fulfilling the order. You will have a certain amount of time to decide if you want to keep the item. Once the time period has passed, if you have not returned the item, we will charge your payment method for the full amount.`;

const PreCheckOut = () => {
  const { usersData, setUsersData, setToken } = useMainContext();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [clientSecret, setClientSecret] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLogout, setIsLogout] = useState(false);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [appartment, setAppartment] = useState("");
  const [city, setCity] = useState("");
  const [gavernorate, setGavernorate] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmailMeChecked, setIsEmailMeChecked] = useState(true);
  const [isCardChecked, setIsCardChecked] = useState(true);
  const [isCashChecked, setIsCashChecked] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [isDiffAddress, setIsDiffAddress] = useState(false);
  const [isSubscriptionPolicy, setIsSubscriptionPolicy] = useState(false);
  const [isPayNow, setIsPayNow] = useState(false);

  useEffect(() => {
    let prices = 0;
    let q = 0;
    location?.state?.data?.map((item) => {
      prices += Number(item.price) * item.quantity;
      q += item.quantity;
    });
    setTotalPrice(prices);
  }, []);

  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        const response = await axiosPrivate("/create-checkout-session", {
          method: "POST",
          data: JSON.stringify({}),
        });
        setClientSecret(response?.data?.clientSecret);
      } catch (err) {
        console.log(err.message);
      }
    };

    getPaymentIntent();
  }, []);

  const handleLogout = async () => {
    try {
      const url = `/logout`;
      await axiosPrivate(url);
      setUsersData(null);
      setToken(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center overflow-y-scroll hideScroll">
      {isSubscriptionPolicy && (
        <SubscriptionPolicy
          setIsSubscriptionPolicy={setIsSubscriptionPolicy}
          text={subscriptionPolicy}
        />
      )}

      {clientSecret && isPayNow && isCardChecked && (
        <Elements
          stripe={loadStripe(import.meta.env.VITE_STRIPE_API)}
          options={{ clientSecret }}
        >
          <PayNow setIsPayNow={setIsPayNow} isCardChecked={isCardChecked} />
        </Elements>
      )}
      <div className="w-full h-[70px] p-2 px-6 flex flex-row relative border-b-[1px] border-gray-200 justify-between items-center overflow-hidden">
        <Link className="flex justify-center items-center" to={"/"}>
          <img
            className="w-[30px] h-[30px] absolute left-8 "
            src={logo}
            style={{ objectFit: "cover", scale: "3.8" }}
          />
        </Link>
        <div className="flex flex-row justify-center items-center gap-4">
          <Link
            to={`/cart`}
            className="hover:text-red-700 hover:cursor-pointer w-[50px] h-[50px] relative flex justify-center items-center"
          >
            <RxLockClosed size={26} />
            <p className="w-[50px] h-[50px] absolute top-[5px] right-0 md:text-[10px] text-[8px] font-[600] flex justify-center items-center">
              {location?.state?.data ? location?.state?.data?.length : 0}
            </p>
          </Link>
        </div>
      </div>

      <div className="w-full h-[calc(100%-70px)] flex md:flex-row flex-col">
        <div className="flex-[10] h-full p-8 flex flex-col gap-8 overflow-y-scroll hideScroll md:pl-[80px]">
          {!usersData ? (
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-row justify-between items-center w-full">
                <p className="font-[600] text-[22px]">Contact</p>
                <Link
                  to={`/Login`}
                  state={{ from: location }}
                  className="text-blue-700 underline hover:cursor-pointer text-[14px]"
                >
                  Log in
                </Link>
              </div>
              <TextInput
                placeHolder={"Email or mobile phone number"}
                value={email}
                setValue={setEmail}
              />
              <div className="w-full flex flex-row justify-start gap-4">
                <input
                  type="checkbox"
                  checked={isEmailMeChecked}
                  value={`emailMe`}
                  onChange={() => setIsEmailMeChecked((prev) => !prev)}
                />
                <p className="text-[14px]">Email me with news and offers</p>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center gap-2 border-b-[1px] border-gray-300 pb-2">
              <div className="w-full flex flex-row justify-between items-center">
                <Link
                  to={"/account"}
                  className="text-[14px] text-gray-500 hover:underline hover:text-blue-700"
                >
                  Account
                </Link>
                <button
                  className="bg-gray-100 rounded-md p-[6px] text-blue-700"
                  onClick={() => setIsLogout((prev) => !prev)}
                >
                  {isLogout ? (
                    <IoIosArrowUp size={12} />
                  ) : (
                    <IoIosArrowDown size={12} />
                  )}
                </button>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                {usersData?.email}
              </div>
              <div className="w-full h-auto flex flex-row justify-between items-center">
                <button
                  className="text-[14px] flex justify-center items-center text-blue-700 underline overflow-hidden"
                  style={
                    isLogout
                      ? {
                          height: "20px",
                          transition: "height 0.2s ease-in-out",
                        }
                      : {
                          height: "0",
                          transition: "height 0.2s ease-in-out",
                        }
                  }
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
          <div className="w-full flex flex-col gap-4">
            <div className="text-[22px] font-[600]">Delivery</div>
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

            <div className="w-full flex flex-row justify-start items-center gap-4">
              <input type="checkbox" />
              <p className="text-[14px]">Save this information for next time</p>
            </div>

            <div className="w-full flex flex-row justify-start items-center gap-4">
              <input type="checkbox" />
              <p className="text-[14px]">Text me with news and offers</p>
            </div>

            <div className="text-[18px] font-[600]">Shipping method</div>
            <div className="w-full border-[1px] border-blue-400 rounded-md bg-blue-100 flex flex-row justify-between items-center p-3 py-4">
              <p className="text-[14px]">Standard Shipping</p>
              <p className="text-[14px]">{`£${Number(50).toFixed(2)}`}</p>
            </div>

            <div className="text-[22px] font-[600]">Payment</div>
            <div>
              <p className="text-[14px] text-gray-500">
                All transactions are secure and encrypted.
              </p>
            </div>

            <PaymentMethod
              isCardChecked={isCardChecked}
              setIsCardChecked={setIsCardChecked}
              isCashChecked={isCashChecked}
              setIsCashChecked={setIsCashChecked}
            />

            <div className="text-[22px] font-[600]">Billing address</div>
            <BillingAddress
              isSameAddress={isSameAddress}
              setIsSameAddress={setIsSameAddress}
              isDiffAddress={isDiffAddress}
              setIsDiffAddress={setIsDiffAddress}
            />

            <div className="w-full py-3 mb-8">
              <button
                className="w-full p-3 flex flex-row justify-center items-center rounded-md text-white bg-blue-600"
                // onClick={() => navigate("/payment")}
                onClick={() => isCardChecked && setIsPayNow(true)}
              >
                Pay now
              </button>
            </div>

            <div className="w-full flex justify-start border-t-[1px] p-3">
              <p
                className="text-blue-600 underline text-[14px] hover:cursor-pointer"
                onClick={() => setIsSubscriptionPolicy(true)}
              >
                Subscription policy
              </p>
            </div>
          </div>
        </div>

        <div className="flex-[8] h-full bg-gray-50 border-l-[1px] border-gray-300 p-8 flex flex-col gap-4 md:pr-[80px] overflow-y-scroll hideScroll md:pb-8 pb-[100px]">
          <div className="flex flex-col gap-4 justify-between items-center">
            {location?.state?.data &&
              location?.state?.data?.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex flex-row justify-between items-center"
                >
                  <div className="w-full flex flex-row gap-4 items-center">
                    <div className="relative">
                      <img
                        className="w-[80px] h-[80px] border-[1px] border-gray-300 rounded-md"
                        src={item.img[0]}
                      />
                      <div className="absolute -top-2 -right-2 aspect-square rounded-full  px-[6px] flex justify-center items-center bg-gray-600 text-white text-[12px]">
                        {item.quantity}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="font-[700] text-[14px] max-w-[260px]">
                        {item.desc}
                      </p>
                      <p className="text-[12px]">{`${item.size} / ${item.color}`}</p>
                    </div>
                  </div>
                  <div className="h-full flex items-center text-[14px]">{`£${(
                    Number(item.price) * Number(item.quantity)
                  ).toFixed(2)}`}</div>
                </div>
              ))}
          </div>
          <div className="flex flex-row justify-between items-center gap-8">
            <input
              type="text"
              placeholder="Discount code"
              className="p-3 flex-1 outline-none border-[1px] border-gray-300 rounded-md"
            />
            <button className="p-3 border-[1px] border-gray-300 bg-gray-100 rounded-md text-gray-400">
              Apply
            </button>
          </div>
          <div className="flex flex-row justify-between items-center gap-8">
            <p className="text-[14px]">Subtotal</p>
            <p className="text-[14px]">{`£${Number(totalPrice).toFixed(2)}`}</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-8">
            <p className="text-[14px]">Shipping</p>
            <p className="text-[14px]">{`£${Number(50).toFixed(2)}`}</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-8">
            <p className="text-[16px] font-[600]">Total</p>
            <p className="text-[16px] font-[600]">{`£${(
              Number(totalPrice) + Number(50)
            ).toFixed(2)}`}</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-8 text-gray-500 text-[14px]">
            <p>{`including £${(
              (Number(totalPrice) + Number(50)) *
              (10 / 100)
            ).toFixed(2)} in taxes`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreCheckOut;
