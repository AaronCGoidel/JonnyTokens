import { useState } from "react";
import { ethers } from "ethers";

function WalletBalance() {
  const [balance, setBalance] = useState(null);

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div className="flex font-sans mt-2 mr-2">
      <div className="p-5 bg-white shadow-md rounded-lg">
        <h3 className="mb-3 text-lg">
          Your Wallet Balance:{" "}
          {balance === null ? (
            <span className={`text-red-500 font-bold`}>Not Loaded</span>
          ) : (
            <span>
              {balance}
              <span className="text-sm text-slate-600">eth</span>
            </span>
          )}
        </h3>
        <button
          className="h-10 px-4 font-semibold rounded-md bg-violet-600 text-white"
          onClick={() => getBalance()}
        >
          Get My Balance
        </button>
      </div>
    </div>
  );
}

export default WalletBalance;
