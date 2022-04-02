/* eslint-disable no-unused-vars */
import { useSmartContract } from "hooks/useSmartContract";
import { useState } from "react";
import { useMoralisFile, useMoralis, useWeb3Contract } from "react-moralis";
import { Card } from "antd";
import abi from "../../contracts/ABI.json";

const smartContract = "0x23b8bf53cb0dc8607b9b79f28cd5c1b5d7834cf2";

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
};

function CreateNFT() {
  const { saveFile } = useMoralisFile();
  const { Moralis, account } = useMoralis();
  const { createNFT } = useSmartContract();

  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  // const [nftImage, setNftImage] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
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
      image: imageHash,
    };
    // create NFT
    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await metadataFile.saveIPFS();
    const metadataHash = await metadataFile.ipfs();
    alert("Uploaded to IPFS");

    // const nft = await createNFT(metadataHash).then((res) => {
    //   console.log(res);
    //   return res;
    // });

    useWeb3Contract({
      abi: abi,
      contractAddress: smartContract,
      functionName: "createToken",
      params: {
        tokenURI: metadataHash,
      },
    });

    return (
      <div>
        <Card style={styles.card}>
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
          <button onClick={HandleSubmit}>Create NFT</button>
        </Card>
      </div>
    );
  };
}

export default CreateNFT;
