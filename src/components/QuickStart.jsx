import { Card, Typography } from "antd";
import React from "react";
import wizzie from "../assets/wizzie.png";
const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={{ marginTop: "10px", ...styles.card }}
        title={
          <>
            📡 <Text strong> Open Sorcerors </Text>
          </>
        }
      >
        <img src={wizzie} alt="wizzie" style={{ width: "100%" }} />
      </Card>
      <Card
        style={{ marginTop: "10px", ...styles.card }}
        title={
          <>
            🖌️ <Text strong> NFT Emporium </Text>
          </>
        }
      >
        <Text style={styles.text}>
          <Text strong>NFT Emporium</Text> is a decentralized NFT marketplace
          built on top of <Text strong>Ethereum</Text>.
        </Text>
      </Card>
    </div>
  );
}
