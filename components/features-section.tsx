"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  Clock, 
  Shield, 
  Zap, 
  MessageSquare,
  FileText,
  Users,
  Brain,
  Languages,
  DollarSign,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Ask questions in any language. Our AI understands and responds in your preferred language, breaking down language barriers.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Powered by OpenAI GPT-4o, one of the most advanced AI models. Get accurate, contextual legal advice tailored to your specific situation.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Get instant legal guidance anytime, anywhere. No appointments needed, no waiting times. Your legal advisor is always ready.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    icon: DollarSign,
    title: "100% Free",
    description: "Access professional legal advice without spending a penny. No hidden fees, no subscriptions. Free legal help for everyone.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your conversations are encrypted and secure. We respect your privacy and never share your information with third parties.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    icon: FileText,
    title: "Actionable Solutions",
    description: "Get step-by-step guidance on how to solve your legal problems. Understand what to do, when to do it, and how to do it.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Designed for common people who don't have legal knowledge. Complex legal terms explained in simple, understandable language.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    icon: Zap,
    title: "Instant Responses",
    description: "Get answers in seconds, not days. No need to wait for lawyer appointments or pay consultation fees.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    icon: CheckCircle2,
    title: "Legitimate Advice",
    description: "Get reliable legal guidance based on current laws and regulations. Our AI is trained on legal databases and case law.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 glass-light border-blue-500/30 text-blue-300">
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white neon-blue">
            Everything You Need for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
              Legal Success
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive legal assistance powered by{" "}
            <span className="font-semibold text-white">
              cutting-edge AI technology
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={cn(
                  "group relative overflow-hidden glass-card border-blue-500/20 hover:border-blue-400/40 hover-glow hover-lift transition-all duration-300 animate-fade-in"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="relative z-10">
                  <div className="w-14 h-14 rounded-xl glass-light border border-blue-500/20 flex items-center justify-center mb-4 group-hover:border-blue-400/40 transition-all group-hover:bg-blue-500/10">
                    <Icon className="h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

