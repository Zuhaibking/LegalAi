"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Globe,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Ask Your Question",
    description: "Type your legal question in any language. Our AI understands context and nuance.",
    icon: MessageSquare
  },
  {
    number: "02",
    title: "Get Instant Analysis",
    description: "Our GPT-5 powered system analyzes your situation and provides comprehensive guidance.",
    icon: Sparkles
  },
  {
    number: "03",
    title: "Receive Actionable Advice",
    description: "Get step-by-step solutions tailored to your specific legal problem.",
    icon: CheckCircle2
  }
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 glass-light border-blue-500/30 text-blue-300">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white neon-blue">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get legal advice in three simple steps.{" "}
            <span className="font-semibold text-white">
              No complexity, no confusion.
            </span>
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-transparent -z-10" />
                )}
                
                <Card className="h-full group glass-card border-blue-500/20 hover:border-blue-400/40 hover-glow hover-lift transition-all duration-300">
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-lg glass-light border border-blue-500/20 flex items-center justify-center group-hover:border-blue-400/40 group-hover:bg-blue-500/10 transition-all">
                        <Icon className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      </div>
                      <span className="text-6xl font-bold text-gray-800/20 group-hover:text-gray-800/30 transition-colors">
                        {step.number}
                      </span>
                    </div>
                    <CardTitle className="text-2xl mb-2 text-white group-hover:text-blue-300 transition-colors">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/chat">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto gradient-neon-blue text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 hover-lift transition-all"
            >
              Start Your Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

