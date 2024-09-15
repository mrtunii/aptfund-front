import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ChevronDown, Facebook, Instagram, Linkedin, Menu, Twitter, X} from "lucide-react"
import WalletSelector from '@/components/WalletSelector'
import {Outlet} from "react-router-dom";


export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
      <div className={`min-h-screen flex flex-col bg-[#FAFAFA]`}>
        <motion.div
          className="container mx-auto py-4 px-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="bg-gray-900 shadow-lg rounded-full px-4 py-3 max-w-4xl mx-auto">
            <nav className="flex items-center justify-between">
              <div className="bg-yellow-400 rounded-full p-2">
                <span className="text-black font-medium text-sm">APT Fund</span>
              </div>
              <div className="lg:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
                </Button>
              </div>
              <div className={`lg:flex items-center space-x-4 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-gray-900 mt-2 p-4 rounded-lg shadow-lg z-50' : 'hidden'}`}>
                <ul className={`flex ${isMenuOpen ? 'flex-col space-y-2' : 'space-x-4'} lg:space-x-4 lg:space-y-0`}>
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
                <div className={`flex ${isMenuOpen ? 'flex-col space-y-2 mt-2' : 'space-x-2'} lg:space-x-2 lg:space-y-0`}>
                  <Button variant="ghost" className="text-white hover:text-gray-900 hover:bg-white font-medium transition-colors">
                    Beneficiary Login
                  </Button>
                  <WalletSelector />
                </div>
              </div>
            </nav>
          </header>
        </motion.div>
        <main className="flex-grow">
          <Outlet />
        </main>
        {/* Footer */}
        <motion.footer
            className="container mx-auto px-4 mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-900 text-white rounded-t-3xl py-8 px-4 text-center">
            <h3 className="text-2xl font-bold mb-2">APT Fund</h3>
            <p className="text-gray-400 mb-4">Together, we create lasting impact.</p>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
              <div className="flex justify-center space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                    <motion.a
                        key={index}
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="sr-only">{Icon.name}</span>
                    </motion.a>
                ))}
              </div>
            </div>
            <p className="text-gray-400 text-sm">&copy; 2024 APT Fund. All rights reserved.</p>
          </div>
        </motion.footer>
      </div>
  )
}