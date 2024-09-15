import React from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, Wallet, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Beneficiary {
    name: string;
    percentage: number;
    logo: string;
}

interface Transaction {
    address: string;
    amount: number;
    timestamp: string;
}

const beneficiaries: Beneficiary[] = [
    { name: "Health For All", percentage: 40, logo: "https://images-platform.99static.com/LnN0O34YIycyFHeai356umpatng=/50x46:1470x1466/500x500/top/smart/99designs-contests-attachments/127/127460/attachment_127460783" },
    { name: "Doctors Without Borders", percentage: 35, logo: "https://images-platform.99static.com/LnN0O34YIycyFHeai356umpatng=/50x46:1470x1466/500x500/top/smart/99designs-contests-attachments/127/127460/attachment_127460783" },
    { name: "Local Health Initiative", percentage: 25, logo: "https://images-platform.99static.com/LnN0O34YIycyFHeai356umpatng=/50x46:1470x1466/500x500/top/smart/99designs-contests-attachments/127/127460/attachment_127460783" },
];

const transactions: Transaction[] = [
    { address: "0x1234...5678", amount: 0.5, timestamp: "2024-08-08 14:30:00" },
    { address: "0xabcd...efgh", amount: 1.2, timestamp: "2024-08-08 13:45:00" },
    { address: "0x9876...5432", amount: 0.3, timestamp: "2024-08-08 12:15:00" },
    { address: "0xijkl...mnop", amount: 0.8, timestamp: "2024-08-08 11:00:00" },
    { address: "0xqrst...uvwx", amount: 0.6, timestamp: "2024-08-08 10:30:00" },
];

export default function CampaignDetailPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <p className="text-sm text-gray-500 mb-2">Updated August 8, 2024</p>
                        <h1 className="text-4xl font-bold mb-4">Bringing health to those who need it most</h1>
                        <div className="flex items-center mb-6">
                            <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Chance Botosh" />
                                <AvatarFallback>CB</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">Chance Botosh</p>
                                <p className="text-sm text-gray-500">Organizer</p>
                            </div>
                        </div>
                        <img
                            src="https://www.rcrc-resilience-southeastasia.org/wp-content/uploads/2016/10/Koppu_Flood-affected-residents-of-Barangay-Delfin-Albano-Isabela-receive-relief-goods-frm-Red-Cross-Oct-20-2015-October-2015-c-Noel-Celis-IFRC-1024x659.jpg"
                            alt="Campaign main image"
                            className="w-full rounded-lg mb-6"
                        />
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="w-full mb-6">
                                <TabsTrigger value="details" className="text-base py-2 px-4">Details</TabsTrigger>
                                <TabsTrigger value="activity" className="text-base py-2 px-4">Activity</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details">
                                <div className="prose max-w-none">
                                    <p>
                                        Millions of people in remote and underserved communities lack access to basic
                                        healthcare services. This lack of access leads to preventable diseases, untreated
                                        injuries, and unnecessary suffering. Our campaign, 'Bringing Health to Those Who
                                        Need It Most,' aims to close this gap by providing critical healthcare services and
                                        resources to the most vulnerable populations.
                                    </p>
                                    <h2>Key Initiatives:</h2>
                                    <ol>
                                        <li>
                                            <strong>Mobile Clinics:</strong>
                                            <p>
                                                We deploy mobile clinics equipped with medical professionals, essential
                                                medicines, and diagnostic tools to reach communities that are far from hospitals
                                                or health centers. These clinics offer general check-ups, maternal care,
                                                vaccinations, and treatment for common illnesses.
                                            </p>
                                        </li>
                                        <li>
                                            <strong>Health Education Programs:</strong>
                                            <p>
                                                We believe in empowering communities with knowledge. Our health education
                                                programs focus on preventative care, hygiene practices, nutrition, and managing
                                                chronic conditions. By educating communities, we help prevent the spread of
                                                diseases and promote healthier lifestyles.
                                            </p>
                                        </li>
                                        <li>
                                            <strong>Maternal and Child Health:</strong>
                                            <p>
                                                Maternal and child health is a priority in our healthcare campaign. We provide
                                                prenatal and postnatal care, nutritional support, and immunizations to ensure
                                                that mothers and their children have a healthy start in life.
                                            </p>
                                        </li>
                                        <li>
                                            <strong>Telemedicine Services:</strong>
                                            <p>
                                                In areas where physical access is difficult, we leverage technology to provide
                                                telemedicine services. Patients can consult with doctors remotely, receive
                                                diagnoses, and get prescriptions without having to travel long distances.
                                            </p>
                                        </li>
                                        <li>
                                            <strong>Partnership with Local Health Workers:</strong>
                                            <p>
                                                We collaborate with local health workers to build capacity within communities.
                                                By training and supporting these frontline workers, we ensure that our efforts
                                                are sustainable and that communities continue to benefit long after our
                                                campaign ends.
                                            </p>
                                        </li>
                                    </ol>
                                    <p>
                                        We are committed to transparency and will provide regular updates on the
                                        progress of our campaign, including success stories, impact reports, and how your
                                        donations are making a difference.
                                    </p>
                                </div>
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
                                    <h2 className="text-3xl font-bold mb-2">60 APT</h2>
                                    <p className="text-sm text-gray-500 mb-2">raised of 100 APT goal</p>
                                    <Progress value={60} className="h-2 mb-2" />
                                    <p className="text-sm text-gray-500">3.2K donations</p>
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
                                    {beneficiaries.map((beneficiary, index) => (
                                        <li key={index} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img src={beneficiary.logo} alt={beneficiary.name} className="w-8 h-8 mr-2 rounded-full" />
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