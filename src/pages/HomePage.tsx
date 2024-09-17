import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {Button} from "@/components/ui/button"
import {
    ArrowRight,
    BarChart,
    Building,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    Heart,
    PieChart,
    Users,
    Wallet
} from "lucide-react"
import {getCampaigns, getVerifiedBeneficiaries} from '@/services/api'

interface Organization {
    id: string;
    name: string;
    description: string;
    logo: string;
    impact: string;
    address: string;
    verified: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface Campaign {
    id: string;
    title: string;
    description: string;
    image: string;
    organization: Organization;
    donation_amount: number;
    donation_count: number;
    created_at: string;
}

const faqs = [
    {
        question: "How is my donation used?",
        answer: "Your donation is used to support our various campaigns and initiatives. We ensure that the majority of funds go directly to the cause, with a small portion used for operational costs to maintain our organization's effectiveness."
    },
    {
        question: "Can I volunteer with your organization?",
        answer: "Yes, we welcome volunteers! We have various opportunities for individuals to contribute their time and skills. Please visit our 'Get Involved' page for more information on current volunteer positions and how to apply."
    },
    {
        question: "Are my donations tax-deductible?",
        answer: "Yes, all donations to APT Fund are tax-deductible to the extent allowed by law. We are a registered 501(c)(3) non-profit organization. You will receive a tax receipt for your donation."
    },
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({question, answer}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className="border border-gray-200 rounded-3xl overflow-hidden mb-4"
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={{
                open: {backgroundColor: "#FAFAFA"},
                closed: {backgroundColor: "white"}
            }}
        >
            <motion.button
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-[18px] font-medium">{question}</span>
                <motion.div
                    variants={{
                        open: {rotate: 180},
                        closed: {rotate: 0}
                    }}
                    transition={{duration: 0.2}}
                >
                    <ChevronDown className="w-5 h-5"/>
                </motion.div>
            </motion.button>
            <motion.div
                variants={{
                    open: {opacity: 1, height: "auto"},
                    closed: {opacity: 0, height: 0}
                }}
                transition={{duration: 0.2}}
                className="px-6 py-4 bg-[#FAFAFA]"
            >
                <p className="text-gray-700">{answer}</p>
            </motion.div>
        </motion.div>
    );
};

const HomePage: React.FC = () => {
    const [verifiedBeneficiaries, setVerifiedBeneficiaries] = useState<Organization[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoadingBeneficiaries, setIsLoadingBeneficiaries] = useState(true);
    const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true);
    const [errorBeneficiaries, setErrorBeneficiaries] = useState<string | null>(null);
    const [errorCampaigns, setErrorCampaigns] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const beneficiariesData = await getVerifiedBeneficiaries();
                setVerifiedBeneficiaries(beneficiariesData);
                setIsLoadingBeneficiaries(false);
            } catch (err) {
                setErrorBeneficiaries('Failed to fetch verified beneficiaries. Please try again later.');
                setIsLoadingBeneficiaries(false);
            }

            try {
                const campaignsData = await getCampaigns();
                setCampaigns(campaignsData);
                setIsLoadingCampaigns(false);
            } catch (err) {
                setErrorCampaigns('Failed to fetch campaigns. Please try again later.');
                setIsLoadingCampaigns(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-inter">
            {/* Hero Section */}
            <motion.section
                className="flex-grow container mx-auto px-4 md:px-0 flex items-center py-12"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5, delay: 0.2}}
            >
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.4}}
                        >
                            <Button variant="outline"
                                    className="mb-4 rounded-full border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium">
                                APT Fund | Powered by Aptos Network
                            </Button>
                        </motion.div>
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 text-center md:text-left"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.6}}
                        >
                            Creating lasting impact through innovative technology
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-gray-600 mb-8 font-normal text-center md:text-left"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.8}}
                        >
                            Your support can change lives through transparent, decentralized giving. Join us in making a
                            difference today.
                        </motion.p>
                        <motion.div
                            className="flex justify-center md:justify-start"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 1}}
                        >
                            <Button
                                className="rounded-full px-6 py-4 md:px-8 md:py-6 text-base md:text-lg bg-gray-900 hover:bg-gray-800 text-white font-medium">
                                Connect to Donate <Wallet className="ml-2 w-5 h-5"/>
                            </Button>
                        </motion.div>
                    </div>
                    <motion.div
                        className="md:w-5/12"
                        initial={{opacity: 0, x: 50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5, delay: 0.8}}
                    >
                        <img
                            src="/images/hero-image.svg"
                            alt="APT Fund blockchain impact illustration"
                            className="w-full h-auto rounded-lg"
                        />
                    </motion.div>
                </div>
            </motion.section>

            {/* Donation Impact Section */}
            <motion.section
                className="container mx-auto px-4 md:px-0 py-16"
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <div className="bg-[#7CE993] rounded-3xl p-8 md:p-16 text-center">
                    <motion.h2
                        className="text-3xl md:text-4xl lg:text-[56px] font-medium mb-4 leading-tight"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.2}}
                    >
                        Your donation matters
                    </motion.h2>
                    <motion.p
                        className="text-base md:text-lg mb-12 max-w-3xl mx-auto font-normal"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.4}}
                    >
                        In collaboration with the Aptos Network, we're revolutionizing charitable giving. Whether it's
                        through digital donations, smart volunteering, or decentralized fundraising, there are many ways
                        to make a meaningful impact. Discover how you can contribute to our mission.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Heart,
                                title: "Direct impact",
                                description: "Your donation goes directly to beneficiaries through secure technology, ensuring immediate and transparent support for our causes."
                            },
                            {
                                icon: PieChart,
                                title: "Verifiable track record",
                                description: "Our projects' progress and outcomes are recorded transparently, providing an immutable history of impact."
                            },
                            {
                                icon: BarChart,
                                title: "Transparent operations",
                                description: "We leverage innovative technology for transparent fund allocation, real-time reporting, and decentralized decision-making."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 0.2 * (index + 3)}}
                            >
                                <div className="bg-white rounded-2xl p-4 mb-4 inline-block">
                                    <item.icon className="w-12 h-12 text-pink-500"/>
                                </div>
                                <h3 className="text-xl md:text-2xl font-medium mb-2">{item.title}</h3>
                                <p className="text-base md:text-lg font-normal">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Current Campaigns Section */}
            <motion.section
                className="container mx-auto px-4 md:px-0 py-16"
                initial={{opacity: 0, y: 50}}

                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                >
                    Current campaigns
                </motion.h2>
                <motion.p
                    className="text-base md:text-lg text-gray-600 mb-12 font-normal max-w-3xl"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.4}}
                >
                    From emergency relief to long-term development projects, your help can make a crucial difference.
                </motion.p>
                {isLoadingCampaigns ? (
                    <div className="text-center">Loading campaigns...</div>
                ) : errorCampaigns ? (
                    <div className="text-center text-red-500">{errorCampaigns}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {campaigns.map((campaign, index) => (
                            <motion.div
                                key={campaign.id}
                                className="bg-[#FAFAFA] rounded-3xl overflow-hidden border border-gray-200 shadow-sm flex flex-col"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 0.2 * (index + 1)}}
                            >
                                <div className="p-4 flex-grow">
                                    <div className="w-full h-[272px] rounded-[32px] overflow-hidden mb-4">
                                        <img src={`http://aptfund.test/images/${campaign.image}`} alt={campaign.title}
                                             className="w-full h-full object-cover"/>
                                    </div>
                                    <h3 className="text-[20px] font-medium mb-2 line-clamp-2">{campaign.title}</h3>
                                    <div className="text-[16px] text-gray-600 mb-3 line-clamp-3"
                                         dangerouslySetInnerHTML={{__html: campaign.description}}/>
                                    <div className="flex items-center mb-3">
                                        <Building className="w-5 h-5 mr-2 text-gray-500"/>
                                        <span className="text-gray-700 font-medium">{campaign.organization.name}</span>
                                    </div>
                                </div>
                                <div className="p-4 flex justify-between items-start">
                                    <div>
                                        <span
                                            className="text-[20px] font-bold block">{campaign.donation_amount.toLocaleString()} APT</span>
                                        <div className="flex items-center text-gray-500 text-sm mt-1">
                                            <Users className="w-4 h-4 mr-1"/>
                                            {campaign.donation_count} donors
                                        </div>
                                    </div>
                                    <Button
                                        className="rounded-full px-6 py-2 bg-[#FAFAFA] text-gray-900 border border-gray-300 hover:bg-gray-100">
                                        Help <ArrowRight className="ml-2 w-4 h-4"/>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.section>

            {/* Verified Beneficiaries Section */}
            <motion.section
                className="container mx-auto px-4 md:px-8 lg:px-16 py-16 bg-[#f8f3e7] rounded-3xl my-16"
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-center"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                >
                    Verified Beneficiaries
                </motion.h2>
                <motion.p
                    className="text-base md:text-lg text-gray-600 mb-12 font-normal max-w-3xl mx-auto text-center"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.4}}
                >
                    These organizations have been thoroughly vetted and are making a real impact in their communities.
                    Your support directly contributes to their vital work.
                </motion.p>
                {isLoadingBeneficiaries ? (
                    <div className="text-center">Loading beneficiaries...</div>
                ) : errorBeneficiaries ? (
                    <div className="text-center text-red-500">{errorBeneficiaries}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {verifiedBeneficiaries.map((beneficiary, index) => (
                            <motion.div
                                key={beneficiary.id}
                                className="bg-[#FAFAFA] rounded-2xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 0.2 * (index + 1)}}
                            >
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <img src={`${beneficiary.logo}`}
                                             alt={beneficiary.name}
                                             className="w-16 h-16 rounded-full mr-4 object-cover"/>
                                        <div>
                                            <h3 className="text-xl font-medium">{beneficiary.name}</h3>
                                            <p className="text-sm text-gray-500">{beneficiary.address}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4">{beneficiary.description}</p>
                                    <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1"/>
                      Verified
                    </span>
                                        <span className="text-sm font-medium text-gray-900">{beneficiary.impact}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.section>

            {/* FAQ Section */}
            <motion.section
                className="container mx-auto px-4 md:px-6 py-16"
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
                    <motion.div
                        className="lg:w-1/2 mb-8 lg:mb-0"
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5, delay: 0.2}}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">Got questions? we've got
                            answers.</h2>
                        <p className="text-base md:text-lg font-normal text-gray-600">
                            Find answers to some of the most common questions about our work and how you can get
                            involved.
                        </p>

                        <Button
                            className="mt-6 rounded-full bg-gray-900 text-white hover:bg-gray-800 text-base md:text-lg font-medium">
                            View All FAQs <ChevronRight className="ml-2 w-5 h-5"/>
                        </Button>
                    </motion.div>
                    <motion.div
                        className="lg:w-1/2"
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5, delay: 0.4}}
                    >
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer}/>
                        ))}
                    </motion.div>
                </div>
            </motion.section>
        </div>
    )
}

export default HomePage