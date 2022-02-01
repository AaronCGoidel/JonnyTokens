import { useState } from "react";
import { ethers } from "ethers";

function MintStatus({ minted, total }) {
  return (
    <div className="flex font-sans mt-2">
      <div className="p-5 bg-white shadow-md rounded-lg">
        <h3 className="text-lg">
          Tokens Minted:{" "}
          {minted}/{total}
        </h3>
      </div>
    </div>
  );
}

export default MintStatus;
