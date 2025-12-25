"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Zap,
  MessageSquare,
  TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Futuristic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-scan pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <Badge 
              variant="outline" 
              className="px-4 py-1.5 text-sm glass-light border-emerald-500/30 text-emerald-300 hover:border-emerald-400/50 hover-glow transition-all"
            >
              <Sparkles className="h-3 w-3 mr-2 text-emerald-400 animate-pulse-glow" />
              Powered by GPT-4o • Available 24/7
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white neon-blue animate-fade-in">
              Free Legal Advice
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-silver-300 animate-gradient">
              For Everyone
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed text-gray-300">
            Get instant legal guidance in{" "}
            <span className="font-semibold text-blue-400 neon-blue">any language</span>. 
            Understand your rights, solve legal problems, and navigate the system{" "}
            <span className="font-semibold text-blue-400 neon-blue">without expensive lawyers</span>.
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            <span className="font-medium text-gray-300">
              AI-powered legal advisor
            </span>{" "}
            that understands your situation and provides actionable solutions
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/chat">
              <Button 
                size="lg" 
                className="group text-lg px-8 py-6 h-auto gradient-neon-blue text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 hover-lift transition-all"
              >
                Start Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/chat">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 h-auto glass-light border-2 border-blue-500/50 text-blue-300 hover:text-white hover:border-blue-400 hover-glow transition-all"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Chat
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Globe, value: "100+", label: "Languages Supported" },
              { icon: Zap, value: "24/7", label: "Always Available" },
              { icon: TrendingUp, value: "100%", label: "Free Forever" },
              { icon: Sparkles, value: "AI", label: "Powered" }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index}
                  className="space-y-2 p-6 rounded-lg glass-card border-blue-500/20 hover:border-blue-400/40 hover-glow hover-lift transition-all group"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <span className="text-3xl font-bold text-white neon-blue">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-500/50 rounded-full flex items-start justify-center p-2 glass-light">
          <div className="w-1.5 h-3 bg-blue-400 rounded-full glow-blue" />
        </div>
      </div>
    </section>
  )
}

