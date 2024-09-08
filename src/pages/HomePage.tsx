import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronRight, Heart, PieChart, BarChart, ArrowRight, Building, Users, CheckCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { WalletSelector } from '@/components/WalletSelector';

const campaigns = [
  {
    title: "Bringing Health to Those Who Need It Most",
    description: "Access to quality healthcare should be a right, not a privilege. Our campaign...",
    image: "/placeholder.svg?height=272&width=389",
    organization: "Health For All",
    raised: 60000,
    donors: 1234,
  },
  {
    title: "School Supplies for Underprivileged Children",
    description: "Education is the key to breaking the cycle of poverty, but many children in...",
    image: "/placeholder.svg?height=272&width=389",
    organization: "Edu Support",
    raised: 45000,
    donors: 987,
  },
  {
    title: "Kick Off a Better Future: Support Our Football Field Project",
    description: "Football is more than just a game—it's a powerful tool for social change...",
    image: "/placeholder.svg?height=272&width=389",
    organization: "Sports United",
    raised: 30000,
    donors: 543,
  },
];

const verifiedBeneficiaries = [
  {
    name: "Global Health Initiative",
    category: "Healthcare",
    description: "Providing essential medical care to underserved communities worldwide.",
    image: "/placeholder.svg?height=100&width=100",
    impact: "500,000 patients treated",
  },
  {
    name: "EduForAll Foundation",
    category: "Education",
    description: "Ensuring access to quality education for children in developing countries.",
    image: "/placeholder.svg?height=100&width=100",
    impact: "1,000 schools built",
  },
  {
    name: "Clean Water Project",
    category: "Environment",
    description: "Bringing clean, safe drinking water to rural communities.",
    image: "/placeholder.svg?height=100&width=100",
    impact: "2 million people served",
  },
  {
    name: "Tech for Good",
    category: "Technology",
    description: "Bridging the digital divide through technology education and access.",
    image: "/placeholder.svg?height=100&width=100",
    impact: "100,000 students trained",
  },
  {
    name: "Hunger Relief Network",
    category: "Food Security",
    description: "Combating hunger through food banks and sustainable agriculture programs.",
    image: "/placeholder.svg?height=100&width=100",
    impact: "10 million meals provided",
  },
  {
    name: "Shelter Solutions",
    category: "Housing",
    description: "Building safe, affordable housing for families in need.",
    image: "/placeholder.svg?height=100&width=100",
    impact: "5,000 homes constructed",
  },
];

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
  {
    question: "How can I stay updated on your work?",
    answer: "You can stay updated on our work by subscribing to our newsletter, following us on social media platforms, or checking our website regularly for news and updates on our campaigns and impact."
  },
  {
    question: "Can I choose which campaign my donation goes to?",
    answer: "Yes, you can designate your donation to a specific campaign or project. During the donation process, you'll have the option to select which initiative you'd like your contribution to support."
  }
]

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-3xl overflow-hidden mb-4">
      <button
        className={`w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none ${isOpen ? 'rounded-t-3xl' : 'rounded-3xl'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[18px] font-medium">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-[#FAFAFA] rounded-b-3xl">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-inter">
      {/* Header */}
      <div className="container mx-auto py-4 px-4">
        <header className="bg-gray-900 shadow-lg rounded-full px-6 py-3 max-w-4xl mx-auto">
          <nav className="flex items-center justify-between">
            <div className="bg-yellow-400 rounded-full p-2">
              <span className="text-black font-medium text-sm">APT Fund</span>
            </div>
            <ul className="flex space-x-4 flex-grow justify-center">
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:text-gray-300 inline-flex items-center font-medium">
                    Resources <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Resource 1</DropdownMenuItem>
                    <DropdownMenuItem>Resource 2</DropdownMenuItem>
                    <DropdownMenuItem>Resource 3</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300 font-medium">
                  What we do
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300 font-medium">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300 font-medium">
                  Contact
                </a>
              </li>
            </ul>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="text-white hover:text-gray-900 hover:bg-white font-medium transition-colors">
                Beneficiary Login
              </Button>
              <WalletSelector />
            </div>
          </nav>
        </header>
      </div>

      {/* Hero Section */}
      <section className="flex-grow container mx-auto px-4 md:px-0 flex items-center py-12">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Button variant="outline" className="mb-4 rounded-full border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium">
              APT Fund | Powered by Aptos Foundation
            </Button>
            <h1 className="text-5xl md:text-6xl font-medium mb-4">
              Creating lasting impact through innovative technology
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-normal">
              Your support can change lives through transparent, decentralized giving. Join us in making a difference today.
            </p>
            <Button className="rounded-full px-8 py-6 text-lg bg-gray-900 hover:bg-gray-800 text-white font-medium">
              Connect to Donate <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="md:w-5/12">
            <img
              src="/images/hero-image.svg"
              alt="APT Fund blockchain impact illustration"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Donation Impact Section */}
      <section className="container mx-auto px-4 md:px-0 py-16">
        <div className="bg-[#7CE993] rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-4xl md:text-[56px] font-medium mb-4 leading-tight">Your donation matters</h2>
          <p className="text-lg mb-12 max-w-3xl mx-auto font-normal">
            In collaboration with the Aptos Foundation, we're revolutionizing charitable giving. Whether it's through digital donations, smart volunteering, or decentralized fundraising, there are many ways to make a meaningful impact. Discover how you can contribute to our mission.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="bg-white rounded-2xl p-4 mb-4 inline-block">
                <Heart className="w-12 h-12 text-pink-500" />
              </div>
              <h3 className="text-2xl font-medium mb-2">Direct impact</h3>
              <p className="text-lg font-normal">
                Your donation goes directly to beneficiaries through secure technology, ensuring immediate and transparent support for our causes.
              </p>
            </div>
            <div>
              <div className="bg-white rounded-2xl p-4 mb-4 inline-block">
                <PieChart className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-medium mb-2">Verifiable track record</h3>
              <p className="text-lg font-normal">
                Our projects' progress and outcomes are recorded transparently, providing an immutable history of impact.
              </p>
            </div>
            <div>
              <div className="bg-white rounded-2xl p-4 mb-4 inline-block">
                <BarChart className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-medium mb-2">Transparent operations</h3>
              <p className="text-lg font-normal">
                We leverage innovative technology for transparent fund allocation, real-time reporting, and decentralized decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Campaigns Section */}
      <section className="container mx-auto px-4 md:px-0 py-16">
        <h2 className="text-4xl md:text-5xl font-medium mb-4">Current campaigns</h2>
        <p className="text-lg text-gray-600 mb-12 font-normal max-w-3xl">
          From emergency relief to long-term development projects, your help can make a crucial difference.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <div key={index} className="bg-[#FAFAFA] rounded-3xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
              <div className="p-4 flex-grow">
                <div className="w-full h-[272px] rounded-[32px] overflow-hidden mb-4">
                  <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[20px] font-medium mb-2 line-clamp-2">{campaign.title}</h3>
                <p className="text-[16px] text-gray-600 mb-3 line-clamp-3">{campaign.description} <a href="#" className="text-blue-500 hover:underline">Read More</a></p>
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-700 font-medium">{campaign.organization}</span>
                </div>
              </div>
              <div className="p-4 flex justify-between items-start">
                <div>
                  <span className="text-[20px] font-bold block">${campaign.raised.toLocaleString()}</span>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Users className="w-4 h-4 mr-1" />
                    {campaign.donors} donors
                  </div>
                </div>
                <Button className="rounded-full px-6 py-2 bg-[#FAFAFA] text-gray-900 border border-gray-300 hover:bg-gray-100">
                  Help <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full px-8 py-3 text-base font-medium">
            See all campaigns <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Verified Beneficiaries Section */}
      <section className="container mx-auto px-8 md:px-16 py-16 bg-[#f8f3e7] rounded-3xl my-16">
        <h2 className="text-4xl md:text-5xl font-medium mb-4 text-center">Verified Beneficiaries</h2>
        <p className="text-lg text-gray-600 mb-12 font-normal max-w-3xl mx-auto text-center">
          These organizations have been thoroughly vetted and are making a real impact in their communities.
          Your support directly contributes to their vital work.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedBeneficiaries.map((beneficiary, index) => (
            <div key={index} className="bg-[#FAFAFA] rounded-2xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={beneficiary.image} alt={beneficiary.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
                  <div>
                    <h3 className="text-xl font-medium">{beneficiary.name}</h3>
                    <p className="text-sm text-gray-500">{beneficiary.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{beneficiary.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </span>
                  <span className="text-sm font-medium text-gray-900">{beneficiary.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full px-8 py-3 text-base font-medium">
            View All Beneficiaries <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-medium mb-4">Got questions? we've got answers.</h2>
            <p className="text-[18px] font-normal text-gray-600">
              Find answers to some of the most common questions about our work and how you can get involved.
            </p>
            
            <Button className="mt-6 rounded-full bg-gray-900 text-white hover:bg-gray-800 text-[16px] font-medium">
              View All FAQs <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="lg:w-1/2">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 mb-0">
        <div className="bg-gray-900 text-white rounded-t-3xl py-8 px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">APT Fund</h3>
          <p className="text-gray-400 mb-4">Together, we create lasting impact.</p>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <p className="text-gray-400 text-sm">&copy; 2024 APT Fund. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage