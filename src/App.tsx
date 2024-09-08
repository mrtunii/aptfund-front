import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { Network } from "@aptos-labs/ts-sdk";

const wallets = [
  new PontemWallet(),
];

export default function App() {
  return (
    <AptosWalletAdapterProvider
    plugins={wallets}
    autoConnect={true}
    dappConfig={{ network: Network.MAINNET }}
    onError={(error) => {
        console.log("error", error);
      }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    </AptosWalletAdapterProvider>
  );
}