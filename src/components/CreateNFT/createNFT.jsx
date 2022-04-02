/* eslint-disable no-unused-vars */
import { useSmartContract } from "hooks/useSmartContract";
import { useState } from "react";
import { useMoralisFile, useMoralis } from "react-moralis";

function CreateNFT() {
  const { saveFile } = useMoralisFile();
  const { Moralis, account } = useMoralis();
  const { createNFT } = useSmartContract();

  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftImage, setNftImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // save image to IPFS
    const imageHash = await saveFile("nftImage", nftImage, {
      saveIPFS: true,
    }).then((res) => {
      console.log(res);
      return res;
    });
    const metadata = {
      name: nftName,
      description: nftDescription,
      image: imageHash,
    };
    // create NFT
    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await metadataFile.saveIPFS();
    const metadataHash = await metadataFile.ipfs();
    alert("Uploaded to IPFS");

    const nft = await createNFT(metadataHash).then((res) => {
      console.log(res);
      return res;
    });
  };

  return (
    <div>
      <h1>Create NFT</h1>
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
      <input
        type="file"
        placeholder="NFT Image"
        value={nftImage}
        onChange={(e) => setNftImage(e.target.files[0])}
      />
      <button onClick={handleSubmit}>Create NFT</button>
    </div>
  );
}

export default CreateNFT;
