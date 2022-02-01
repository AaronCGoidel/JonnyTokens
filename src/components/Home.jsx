import { useEffect, useState } from "react";
import WalletBalance from "./WalletBalance";
import MintStatus from "./MintStatus";

import { ethers } from "ethers";
import JonnyTokens from "../artifacts/contracts/JonnyTokens.sol/JonnyTokens.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "0xBAeB29bac0D5b40e696dcCb16F7987758872e307";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, JonnyTokens.abi, signer);

function Home() {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div className="p-5 bg-slate-900 h-screen w-screen">
      <div className="flex flex-wrap items-start">
        <WalletBalance />
        <MintStatus minted={totalMinted} total={7} />
      </div>

      <h1 className="mt-6 text-3xl text-white">The JonnyTokens NFT Collection</h1>
      <div className="flex flex-wrap">
        {Array(totalMinted + 1)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="col-sm">
              <NFTImage tokenId={i} getCount={getCount} />
            </div>
          ))}
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = import.meta.env.VITE_CONTENT_LOCATION || "Qmau29yDnyLjn4kZtiLwiJ84gHamBnCTJQzuHjd8cSfufo";
  const metadataURI = `${contentId}/${tokenId + 1}.png`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId + 1}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    console.log("minting token");
    const connection = contract.connect(signer);
    const addr = connection.address;
    console.log(addr);
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther("0.002"),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <>
      {tokenId < 7 ? (
        <div className="w-80 m-2 p-5 bg-white shadow-md rounded-lg">
          <img
          className="mb-2 rounded-lg"
            loading="lazy"
            src={isMinted ? imageURI : "/img/placeholder.png"}
          />

          {!isMinted ? (
            <button
              className="h-10 px-4 font-semibold rounded-md bg-violet-600 text-white"
              onClick={mintToken}
            >
              Mint
            </button>
          ) : (
            <button
              className="h-10 px-4 font-semibold rounded-md bg-violet-600 text-white"
              onClick={getURI}
            >
              Taken! Show URI
            </button>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Home;
