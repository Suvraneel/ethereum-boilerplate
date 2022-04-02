/* eslint-disable no-unused-vars */
import { message } from "antd";
import { useState } from "react";
import {
  useMoralisFile,
  useMoralis,
  useWeb3ExecuteFunction,
} from "react-moralis";

import ABI from "../../contracts/ABI.json";
const smartContractAddress = "0x23b8bf53cb0dc8607b9b79f28cd5c1b5d7834cf2";

function CreateNFT() {
  const { saveFile } = useMoralisFile();
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  // const [nftImage, setNftImage] = useState("");

  async function create() {
    // save image to IPFS
    const nftImage = document.getElementById("nftImage").files[0];
    const imageHash = await saveFile("nftImage", nftImage, {
      saveIPFS: true,
    }).then((res) => {
      console.log(res);
      return res;
    });
    const metadata = {
      name: nftName,
      description: nftDescription,
      image: imageHash._ipfs,
    };
    console.log(metadata);
    // create NFT
    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await metadataFile.saveIPFS();
    const metadataHash = await metadataFile.ipfs();
    console.log(metadataHash);
    const options = {
      contractAddress: smartContractAddress,
      functionName: "createToken",
      abi: ABI,
      params: {
        tokenURI: metadataHash,
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => message.success("NFT created successfully"),
      onError: (error) => message.error(error),
    });
    // const nft = await createNFT(metadataHash).then((res) => {
    //   console.log(res);
    //   return res;
    // });
  }

  return (
    <div>
      <h1 style={{ color: "#fff" }}>Create NFT</h1>
      <input
        type="text"
        placeholder="NFT Name"
        value={nftName}
        onChange={(e) => setNftName(e.target.value)}
      />
      <input
        type="text"
        placeholder="NFT Description"
        value={nftDescription}
        onChange={(e) => setNftDescription(e.target.value)}
      />
      <input type="file" placeholder="NFT Image" id="nftImage" />
      <button onClick={create}>Create NFT</button>
    </div>
  );
}

export default CreateNFT;
