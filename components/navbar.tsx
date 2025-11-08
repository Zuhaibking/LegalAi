"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Scale, 
  Globe, 
  Clock, 
  Sparkles, 
  Menu, 
  X,
  Zap,
  Shield,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-blue-500/30 shadow-lg shadow-blue-500/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/40 transition-all" />
              <Scale className="h-8 w-8 text-blue-400 relative z-10 group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white neon-blue group-hover:neon-silver transition-all">
                LegalAI
              </span>
              <span className="text-xs text-blue-300/80 -mt-1">24/7 Advisor</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-all hover:neon-blue">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-all hover:neon-blue">
              How It Works
            </a>
            <Link href="/chat">
              <Button variant="outline" size="sm" className="gap-2 glass-light border-blue-500/30 text-gray-300 hover:text-white hover:border-blue-400/50 hover-glow transition-all">
                <MessageSquare className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="sm" className="gap-2 gradient-neon-blue text-white hover:shadow-lg hover:shadow-blue-500/50 hover-lift transition-all">
                <Zap className="h-4 w-4" />
                Try Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-4 border-t border-blue-500/30 mt-4 pt-4 glass-light">
            <a
              href="#features"
              className="block text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <div className="flex gap-2 pt-2">
              <Link href="/chat" className="flex-1">
                <Button variant="outline" size="sm" className="w-full glass-light border-blue-500/30 text-gray-300">
                  Get Started
                </Button>
              </Link>
              <Link href="/chat" className="flex-1">
                <Button size="sm" className="w-full gradient-neon-blue text-white">
                  Try Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

