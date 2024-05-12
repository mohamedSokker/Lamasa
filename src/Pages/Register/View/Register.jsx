import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const validate = () => {
    if (
      userName === "" ||
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    )
      return false;
    return true;
  };

  const handleCreate = async () => {
    try {
      if (!validate()) throw new Error("Validation Error");

      setIsLoading(true);
      const url = `api/v1/Users`;
      const body = {
        UserName: userName,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        ProfileImg: "",
        Role: "User",
        Token: "",
      };

      const data = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify(body),
      });
      console.log(data?.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col pt-2 md:pb-2 pb-[100px] gap-10 px-8 overflow-y-scroll hideScroll">
      {isLoading && (
        <div
          className="absolute  w-full h-full flex flex-col items-center justify-center left-0 top-0 z-[1000]"
          style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
        ></div>
      )}
      <div className="flex flex-row gap-3 text-[14px]">
        <Link className="hover:text-red-600" to={`/`}>{`Home`}</Link>
        <p className="text-gray-500">{`/`}</p>
        <p className="text-gray-500">{`Account`}</p>
      </div>
      <div className="font-[500] text-[26px]">
        <p>Create an account</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <input
          type="text"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="UserName"
          className="w-full border-[1px] border-gray-300 outline-none py-4 pl-3"
        />
        <div className="flex md:flex-row flex-col w-full gap-4">
          <input
            type="text"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="flex-1 border-[1px] border-gray-300 outline-none py-4 pl-3"
          />
          <input
            type="text"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="flex-1 border-[1px] border-gray-300 outline-none py-4 pl-3"
          />
        </div>
        <input
          type="text"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border-[1px] border-gray-300 outline-none py-4 pl-3"
        />
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border-[1px] border-gray-300 outline-none py-4 pl-3"
        />
      </div>
      <div className="w-full flex flex-row justify-between">
        <div>
          <button
            className="bg-black p-4 px-[80px] text-white font-[600] hover:bg-red-600"
            style={{ transition: "all 0.2s ease-in-out" }}
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
