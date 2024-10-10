import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, Wallet, Info, ArrowRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getCampaignDetail } from '@/services/api'

interface Transaction {
    address: string;
    amount: number;
    timestamp: string;
}

const transactions: Transaction[] = [
    { address: "0x1234...5678", amount: 0.5, timestamp: "2024-08-08 14:30:00" },
    { address: "0xabcd...efgh", amount: 1.2, timestamp: "2024-08-08 13:45:00" },
    { address: "0x9876...5432", amount: 0.3, timestamp: "2024-08-08 12:15:00" },
    { address: "0xijkl...mnop", amount: 0.8, timestamp: "2024-08-08 11:00:00" },
    { address: "0xqrst...uvwx", amount: 0.6, timestamp: "2024-08-08 10:30:00" },
];

export default function CampaignDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [campaign, setCampaign] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

        fetchCampaignDetail()
    }, [id])

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
                                            {transactions.map((tx, index) => (
                                                <li key={index} className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">{tx.address}</p>
                                                        <p className="text-sm text-gray-500">{tx.timestamp}</p>
                                                    </div>
                                                    <p className="font-bold">{tx.amount} APT</p>
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
                                    <h2 className="text-3xl font-bold mb-2">{campaign.donation_amount} APT</h2>
                                    <p className="text-sm text-gray-500 mb-2">raised of 100 APT goal</p>
                                    <Progress value={campaign.donation_amount} max={100} className="h-2 mb-2" />
                                    <p className="text-sm text-gray-500">{campaign.donation_count} donations</p>
                                </div>
                                <Button className="w-full mb-3 bg-primary text-white hover:bg-primary/90">
                                    <Wallet className="mr-2 h-4 w-4" /> Donate Now
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
                                                    <AvatarImage src={`${beneficiary.logo}`} alt={beneficiary.name} />
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
                                <CardTitle className="text-lg font-semibold">Recent Donations</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <ul className="space-y-3">
                                    {transactions.slice(0, 3).map((tx, index) => (
                                        <li key={index} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Avatar className="h-8 w-8 mr-2">
                                                    <AvatarImage src={`https://api.dicebear.com/6.x/identicon/svg?seed=${tx.address}`} alt={tx.address} />
                                                    <AvatarFallback>{tx.address.slice(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-semibold">{tx.address.slice(0, 6)}...{tx.address.slice(-4)}</p>
                                                    <p className="text-xs text-gray-500">{tx.timestamp}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-semibold">{tx.amount} APT</p>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="link" className="mt-4 w-full text-sm">See All Donations</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}