import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import {AptosWalletAdapterProvider} from "@aptos-labs/wallet-adapter-react";
import {PontemWallet} from "@pontem/wallet-adapter-plugin";
import {Network} from "@aptos-labs/ts-sdk";
import Layout from "@/components/Layout.tsx";
import React from "react";
import CampaignDetailPage from "@/pages/CampaignDetailPage.tsx";

const wallets = [
    new PontemWallet(),
];

export default function App() {
    return (
        <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect={true}
            dappConfig={{network: Network.MAINNET}}
            onError={(error) => {
                console.log("error", error);
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="campaign/:id" element={<CampaignDetailPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AptosWalletAdapterProvider>
    );
}