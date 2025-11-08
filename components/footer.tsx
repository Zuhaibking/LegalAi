"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Scale, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin,
  MessageSquare,
  Globe,
  Heart
} from "lucide-react"
import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="relative border-t border-blue-500/30 glass">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                <Scale className="h-8 w-8 text-blue-400 relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white neon-blue">
                  LegalAI
                </span>
                <span className="text-xs text-blue-300/80 -mt-1">24/7 Legal Advisor</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Free legal advice powered by{" "}
              <span className="font-semibold text-white">AI</span>. 
              Get instant guidance in any language, anytime.
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs glass-light border-blue-500/30 text-blue-300">
                <Globe className="h-3 w-3 mr-1 text-blue-400" />
                100+ Languages
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:neon-blue">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:neon-blue">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:neon-blue">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:neon-blue">
                  Legal Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:neon-blue">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:neon-blue">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:neon-blue">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Get Started</h3>
            <p className="text-sm text-gray-400 mb-4">
              Ready to get free legal advice? Start your consultation now.
            </p>
            <Link href="/chat">
              <Button 
                size="sm" 
                className="w-full gradient-neon-blue text-white hover:shadow-lg hover:shadow-blue-500/50"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Chat
              </Button>
            </Link>
          </div>
        </div>

        <Separator className="my-8 bg-blue-500/20" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} LegalAI. All rights reserved.{" "}
            <span className="inline-flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-400" /> for everyone
            </span>
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-gray-500 hover:text-blue-400 transition-colors hover-glow"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-blue-400 transition-colors hover-glow"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-blue-400 transition-colors hover-glow"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-blue-400 transition-colors hover-glow"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

