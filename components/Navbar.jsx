import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/navbar.module.css";
import Image from "next/image";
import axios from "axios";
import logo from "../logo.png";
import Link from "next/link";
const Navbar = () => {
  const [userAccount, setUserAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [count, setCount] = useState("");
  const [openModel, setOpenModel] = useState(true);
  const [price, setPrice] = useState([]);
  const [etherSupply, setEtherSupply] = useState([]);
  const [updatedPriceDate, setupdatedPriceDate] = useState("");

  const getEtherPrice = () => {
    try {
      const API_KEY_ETHERSCAN = "2A6JUD2J34U7H3HUXIQH4K72P4JZE745IQ";
      axios
        .get(
          `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${API_KEY_ETHERSCAN}`
        )
        .then((response) => {
          setPrice(response.data.result);
          // console.log(price);

          const timeStamp = Number(response.data.result.ethusd_timestamp);
          // console.log(timeStamp);
          const date = new Date(timeStamp);
          setupdatedPriceDate(
            "UpDate: " +
              ":" +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds()
          );
        });

      axios
        .get(
          `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${API_KEY_ETHERSCAN}`
        )
        .then((response) => {
          setEtherSupply(response.data.result);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfAccountExists = async () => {
    try {
      if (!window.ethereum) console.log("Please Install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setUserAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) console.log("Please Install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        setUserAccount(accounts[0]);
      } else {
        console.log("Sorry!! you donot have an account");
      }

      window.location.reload();
    } catch (error) {
      console.log("Something is wrong!");
    }
  };

  useEffect(() => {
    checkIfAccountExists();
    getEtherPrice();
  }, []);

  console.log(userAccount);
  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.left}>
          <Link href="/">
            <div>
              <h1 className={Style.desktop}>Etherscan</h1>
              <h1 className={Style.mobile}>
                <Image src={logo} alt="Logo Image" />
              </h1>
            </div>
          </Link>
        </div>

        {/* Right side */}

        <div className={Style.right}>
          {userAccount.length ? (
            <button onClick={() => openUserInfo()}>
              Acc : {userAccount.slice(0, 10)}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
