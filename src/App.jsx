import Install from "./components/Install";
import Home from "./components/Home";
import { useEffect, useState } from "react";

import { ethers } from "ethers";
import JonnyTokens from "./artifacts/contracts/JonnyTokens.sol/JonnyTokens.json";

function App() {
  if (typeof web3 !== "undefined") {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      JonnyTokens.abi,
      signer
    );
    return <Home signer={signer} contract={contract} />;
  } else {
    return <Install />;
  }
}

export default App;
