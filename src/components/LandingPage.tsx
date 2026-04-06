import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  CheckCircle2,
  Globe,
  Cpu,
  DollarSign,
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-emerald-500 rounded-sm rotate-45" />
            </div>
            <span className="text-xl font-bold tracking-tighter">cagedase</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
            <a href="#problem" className="hover:text-emerald-600 transition-colors">The Problem</a>
            <a href="#impact" className="hover:text-emerald-600 transition-colors">Impact</a>
          </div>
          <button 
            onClick={onStart}
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-600 transition-all active:scale-95"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-emerald-100 text-emerald-700 rounded-full">
              Plug & Play Infrastructure
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
              Metrics that <br />
              <span className="text-emerald-500 underline decoration-black decoration-4 underline-offset-8">actually move</span> the needle.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Cagedase provides an immersive, real-time view of your entire stack. 
              From DevOps to Revenue, all in one beautiful, automated dashboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all group"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:border-emerald-200 transition-all">
                View Documentation
              </button>
            </div>
          </motion.div>

          {/* Hero Image / Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="relative rounded-3xl overflow-hidden border-[12px] border-black shadow-2xl bg-black">
              <div className="aspect-[16/10] bg-white p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="h-4 w-32 bg-gray-100 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-4 flex-1">
                  <div className="col-span-2 bg-emerald-50 rounded-2xl p-6 flex flex-col justify-between">
                    <div className="h-4 w-24 bg-emerald-200 rounded-full" />
                    <div className="h-32 w-full bg-emerald-100 rounded-xl animate-pulse" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4">
                    <div className="h-4 w-16 bg-gray-200 rounded-full" />
                    <div className="h-8 w-full bg-gray-100 rounded-lg" />
                    <div className="h-8 w-full bg-gray-100 rounded-lg" />
                    <div className="h-8 w-full bg-gray-100 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 hidden lg:block">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Real-time Latency</div>
                  <div className="text-2xl font-black">42ms</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Data is everywhere. <br />
                <span className="text-emerald-500">Insights are not.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Most teams spend 40% of their time just trying to find the right dashboard. 
                Cagedase consolidates your technical, team, and financial metrics into a 
                single source of truth that updates automatically.
              </p>
              <ul className="space-y-4">
                {[
                  "Fragmented monitoring tools",
                  "Manual reporting cycles",
                  "Lack of cross-team visibility",
                  "Complex setup and maintenance"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Efficiency Chart</span>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold">BEFORE</div>
                    <div className="px-3 py-1 bg-emerald-500 rounded-full text-[10px] font-bold">AFTER</div>
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Time to Insight', before: 80, after: 10 },
                    { label: 'Setup Complexity', before: 95, after: 5 },
                    { label: 'Team Alignment', before: 30, after: 90 },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-zinc-400">
                        <span>{stat.label}</span>
                        <span>{stat.after}% vs {stat.before}%</span>
                      </div>
                      <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                        <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${stat.after}%` }} />
                        <div className="h-full bg-zinc-700 transition-all duration-1000" style={{ width: `${stat.before - stat.after}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Built for modern teams.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to monitor, analyze, and grow your product in one place.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-6 h-6" />,
                title: "Infra Metrics",
                desc: "Deep dive into system health, CPU, memory, and latency metrics with precise automation."
              },
              {
                icon: <Layers className="w-6 h-6" />,
                title: "Team Velocity",
                desc: "Track sprint completion, active tasks, and bug resolution rates across your engineering team."
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Revenue Tracking",
                desc: "Real-time MRR, churn rates, and daily revenue visualizations to keep your business on track."
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "User Feedback",
                desc: "Cross-platform sentiment analysis from iOS, Android, and Web users in a unified feed."
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Plug & Play",
                desc: "Easy setup through APIs and webhooks. Connect your stack and start watching in minutes."
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Enterprise Ready",
                desc: "Optimized for performance and security. Built to handle scale without breaking a sweat."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Narrative Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">AI-Powered Narratives</h2>
            <p className="text-gray-600">Don't just look at numbers. Hear the story they're telling.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { title: "System Signal", story: "Infrastructure load spiked by 40% at 3AM. AI detected a memory leak in the auth-service and suggested a container restart before users were impacted.", icon: <Cpu className="w-6 h-6" /> },
                { title: "Revenue Insight", story: "MRR is trending up, but churn in the iOS segment is rising. AI identified a correlation with the recent v2.4 release crash rates.", icon: <DollarSign className="w-6 h-6" /> },
                { title: "Team Pulse", story: "Velocity is stable, but PR cycle time has increased. AI suggests a bottleneck in the code review stage for the frontend team.", icon: <Users className="w-6 h-6" /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic">"{item.story}"</p>
                </motion.div>
              ))}
            </div>
            
            <div className="relative">
              <div className="bg-black rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Cagedase AI Narrative Engine</span>
                </div>
                <div className="space-y-8">
                  <div className="font-mono text-emerald-400 text-sm">
                    {">"} Analyzing real-time signals...
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 2 }}
                        className="h-full bg-emerald-500" 
                      />
                    </div>
                    <div className="h-2 w-3/4 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-emerald-500" 
                      />
                    </div>
                  </div>
                  <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <p className="text-lg font-medium leading-relaxed">
                      "Your technical metrics are healthy, but the revenue story shows a potential bottleneck in conversion. Platform-specific feedback suggests the Web checkout flow is the primary friction point."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 bg-emerald-500 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Ready to transform <br /> your operations?
              </h2>
              <p className="text-emerald-50 text-xl mb-10 leading-relaxed">
                Join 500+ high-growth teams who use Cagedase to make data-driven decisions every single day.
              </p>
              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-black mb-1">99.9%</div>
                  <div className="text-emerald-100 text-sm font-bold uppercase tracking-wider">Uptime</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-1">15min</div>
                  <div className="text-emerald-100 text-sm font-bold uppercase tracking-wider">Setup Time</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-1">24/7</div>
                  <div className="text-emerald-100 text-sm font-bold uppercase tracking-wider">Monitoring</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <button 
                onClick={onStart}
                className="bg-black text-white px-12 py-6 rounded-3xl text-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20"
              >
                Launch Cagedase
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm rotate-45" />
            </div>
            <span className="text-lg font-bold tracking-tighter">cagedase</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 Cagedase Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-bold text-gray-400">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
