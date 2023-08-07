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
  const [updatedPrice, setupdatedPrice] = useState("");

  const getEtherPrice = () => {
    try {
      const API_KEY_ETHERSCAN = "2A6JUD2J34U7H3HUXIQH4K72P4JZE745IQ";
      axios
        .get(
          `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${API_KEY_ETHERSCAN}`
        )
        .then((response) => {
          setPrice(response.data.result);
          console.log(price);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEtherPrice();
  }, []);

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
      </div>
    </div>
  );
};

export default Navbar;
