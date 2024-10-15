import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, Wallet, Info, ArrowRight, ExternalLink, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getCampaignDetail } from '@/services/api'
import {useWallet} from "@aptos-labs/wallet-adapter-react";

interface Transaction {
    id: string;
    transaction_hash: string;
    amount: number;
    campaign_id: string;
    from_address: string;
    to_address: string;
    organization_id: string;
    created_at: string;
    updated_at: string;
}

const calculateTotalRaised = (transactions: Transaction[]): number => {
    return transactions.reduce((total, tx) => total + parseFloat(tx.amount.toString()), 0)
}

export default function CampaignDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [campaign, setCampaign] = useState<any>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isContributeModalOpen, setIsContributeModalOpen] = useState(false)
    const [contributionAmount, setContributionAmount] = useState('')
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const [transactionInProgress, setTransactionInProgress] = useState(false)
    const { account, signAndSubmitTransaction } = useWallet()

    useEffect(() => {
        const fetchCampaignDetail = async () => {
            try {
                const data = await getCampaignDetail(id)
                setCampaign(data)
                setIsLoading(false)
            } catch (err) {
                setError('Failed to fetch campaign details. Please try again later.')
                setIsLoading(false)
            }
        }

        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://aptfund.test/api/campaigns/${id}/transactions`)
                setTransactions(response.data.data)
                const totalRaised = calculateTotalRaised(response.data.data)
                setCampaign(prevCampaign => ({ ...prevCampaign, donation_amount: totalRaised }))
            } catch (err) {
                console.error('Failed to fetch transactions:', err)
            }
        }

        fetchCampaignDetail()
        fetchTransactions()
    }, [id])

    const transferAPT = async (recipientAddress: string, amount: string) => {
        if (!account) {
            console.error("No account connected");
            return false;
        }

        setTransactionInProgress(true);

        try {
            const response = await signAndSubmitTransaction({
                data: {
                    function: "0x1::coin::transfer",
                    functionArguments: [recipientAddress, amount],
                    typeArguments: ["0x1::aptos_coin::AptosCoin"],
                },
            });
            console.log("Transaction response:", response);
            return response.hash;
        } catch (error) {
            console.error("Transaction failed", error);
            return null;
        } finally {
            setTransactionInProgress(false);
        }
    };

    const handleContribute = async () => {
        if (!account || !campaign) return

        const amount = parseFloat(contributionAmount)
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid contribution amount')
            return
        }

        for (const beneficiary of campaign.beneficiaries) {
            const beneficiaryAmount = (amount * beneficiary.percentage / 100).toFixed(8)
            const amountInOctas = (parseFloat(beneficiaryAmount) * 100000000).toFixed(0) // Convert to Octas (8 decimal places)

            // Perform blockchain transaction
            const transactionHash = await transferAPT(beneficiary.address, amountInOctas)

            if (transactionHash) {
                // If blockchain transaction is successful, create backend transaction
                const transactionData = {
                    transaction_hash: transactionHash, // This should be replaced with actual transaction hash from blockchain response
                    from_address: account.address,
                    to_address: beneficiary.address,
                    amount: beneficiaryAmount,
                    campaign_id: campaign.id,
                    organization_id: beneficiary.id
                }

                try {
                    await axios.post('http://aptfund.test/api/transactions', transactionData)
                } catch (error) {
                    console.error('Error creating transaction:', error)
                    alert('Failed to record transaction. Please contact support.')
                    return
                }
            } else {
                alert('Blockchain transaction failed. Please try again.')
                return
            }
        }

        // Refresh transactions after successful contribution
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://aptfund.test/api/campaigns/${id}/transactions`)
                setTransactions(response.data.data)
                const totalRaised = calculateTotalRaised(response.data.data)
                setCampaign(prevCampaign => ({ ...prevCampaign, donation_amount: totalRaised }))
            } catch (err) {
                console.error('Failed to fetch transactions:', err)
            }
        }
        await fetchTransactions()

        setIsContributeModalOpen(false)
        setContributionAmount('')
        setIsSuccessModalOpen(true)
    }

    if (isLoading) {
        return <div className="text-center py-8">Loading campaign details...</div>
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>
    }

    if (!campaign) {
        return <div className="text-center py-8">Campaign not found.</div>
    }

    return (
        <div className="bg-[#fafafa] min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <p className="text-sm text-gray-500 mb-2">Updated {new Date(campaign.created_at).toLocaleDateString()}</p>
                        <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>
                        <div className="flex items-center mb-6">
                            <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={campaign.organization.logo} alt={campaign.organization.name} />
                                <AvatarFallback>{campaign.organization.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{campaign.organization.name}</p>
                                <p className="text-sm text-gray-500">Organizer</p>
                            </div>
                        </div>
                        <img
                            src={`http://aptfund.test/images/${campaign.image}`}
                            alt={campaign.title}
                            className="w-full rounded-lg mb-6"
                        />
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="w-full mb-6 grid grid-cols-3 gap-4">
                                <TabsTrigger value="details" className="px-4 py-2 text-sm font-medium rounded-md transition-colors">
                                    Details
                                </TabsTrigger>
                                <TabsTrigger value="fund-allocation" className="px-4 py-2 text-sm font-medium rounded-md transition-colors">
                                    Fund Allocation
                                </TabsTrigger>
                                <TabsTrigger value="activity" className="px-4 py-2 text-sm font-medium rounded-md transition-colors">
                                    Activity
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="details">
                                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: campaign.description }} />
                            </TabsContent>
                            <TabsContent value="fund-allocation">
                                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: campaign.fund_allocation_description }} />
                            </TabsContent>
                            <TabsContent value="activity">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Transactions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            {transactions.map((tx) => (
                                                <li key={tx.id} className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">{tx.from_address.slice(0, 6)}...{tx.from_address.slice(-4)}</p>
                                                        <p className="text-sm text-gray-500">{new Date(tx.created_at).toLocaleString()}</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="font-bold mr-2">{tx.amount} APT</p>
                                                        <a
                                                            href={`https://explorer.aptoslabs.com/txn/${tx.transaction_hash}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:text-blue-600 transition-colors"
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
                            <CardContent className="p-6">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold mb-2">{campaign.donation_amount.toFixed(2)} APT</h2>
                                    <p className="text-sm text-gray-500 mb-2">raised of {campaign.goal} APT goal</p>
                                    <Progress value={campaign.donation_amount} max={campaign.goal} className="h-2 mb-2" />
                                    <p className="text-sm text-gray-500">{transactions.length} contributions</p>
                                </div>
                                <Button className="w-full mb-3 bg-primary text-white hover:bg-primary/90" onClick={() => setIsContributeModalOpen(true)}>
                                    <Wallet className="mr-2 h-4 w-4" /> Contribute Now
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Share2 className="mr-2 h-4 w-4" /> Share
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                                    Beneficiaries
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-gray-400" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-sm">Percentage of funds allocated to each beneficiary organization</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <ul className="space-y-3">
                                    {campaign.beneficiaries.map((beneficiary: any) => (
                                        <li key={beneficiary.id} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Avatar className="h-8 w-8 mr-2">
                                                    <AvatarImage src={`http://aptfund.test/images/${beneficiary.logo}`} alt={beneficiary.name} />
                                                    <AvatarFallback>{beneficiary.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm">{beneficiary.name}</span>
                                            </div>
                                            <span className="font-semibold text-sm">{beneficiary.percentage}%</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-gray-500 mt-4">
                                    These percentages represent the distribution of funds among beneficiary organizations.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold">Recent Contributions</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <ul className="space-y-3">
                                    {transactions.slice(0, 3).map((tx) => (
                                        <li key={tx.id} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Avatar className="h-8 w-8 mr-2">
                                                    <AvatarImage src={`https://api.dicebear.com/6.x/identicon/svg?seed=${tx.from_address}`} alt={tx.from_address} />
                                                    <AvatarFallback>{tx.from_address.slice(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-semibold">{tx.from_address.slice(0, 6)}...{tx.from_address.slice(-4)}</p>
                                                    <p className="text-xs text-gray-500">{new Date(tx.created_at).toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-sm  font-semibold mr-2">{tx.amount} APT</p>
                                                <a
                                                    href={`https://explorer.aptoslabs.com/txn/${tx.transaction_hash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:text-blue-600 transition-colors"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="link" className="mt-4 w-full text-sm">See All Contributions</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Dialog open={isContributeModalOpen} onOpenChange={setIsContributeModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Contribute to {campaign.title}</DialogTitle>
                        <DialogDescription>
                            Enter the amount you'd like to contribute to this campaign.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                type="number"
                                value={contributionAmount}
                                onChange={(e) => setContributionAmount(e.target.value)}
                                className="col-span-3"
                                placeholder="Enter amount in APT"
                            />
                        </div>
                        <div className="text-sm text-gray-500">
                            <p className="font-semibold mb-2">How your contribution is managed:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Funds are securely held in a smart contract</li>
                                <li>Distributed to beneficiaries based on predefined allocations</li>
                                <li>Transparent transaction history available on the blockchain</li>
                            </ul>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleContribute} disabled={transactionInProgress}>
                            {transactionInProgress ? 'Processing...' : 'Confirm Contribution'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Transaction Successful</DialogTitle>
                    </DialogHeader>
                    <Alert>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                            Your contribution has been successfully processed. Thank you for your support!
                        </AlertDescription>
                    </Alert>
                    <DialogFooter>
                        <Button onClick={() => setIsSuccessModalOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}