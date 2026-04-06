import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Cpu, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  Menu,
  X,
  Smartphone,
  Monitor,
  Globe,
  ShieldAlert,
  Server,
  Clock,
  ChevronDown,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Terminal
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  getMockTechnicalMetrics, 
  getMockTeamMetrics, 
  getMockRevenueMetrics, 
  getMockFeedback,
  getMockApiHealth,
  getMockPlatformMetrics,
  getMockSuspiciousActivity,
  TechnicalMetrics,
  TeamMetrics,
  RevenueMetrics,
  Feedback,
  ApiHealth,
  PlatformMetrics,
  SuspiciousActivity
} from '../lib/mockData';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const [techMetrics, setTechMetrics] = useState<TechnicalMetrics>(getMockTechnicalMetrics());
  const [teamMetrics, setTeamMetrics] = useState<TeamMetrics>(getMockTeamMetrics());
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics>(getMockRevenueMetrics());
  const [feedback, setFeedback] = useState<Feedback[]>(getMockFeedback());
  const [apiHealth, setApiHealth] = useState<ApiHealth[]>(getMockApiHealth());
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetrics[]>(getMockPlatformMetrics());
  const [suspiciousActivity, setSuspiciousActivity] = useState<SuspiciousActivity[]>(getMockSuspiciousActivity());
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000); // default 5s
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);
  const [ipToBlock, setIpToBlock] = useState<string | null>(null);
  const [isBlocking, setIsBlocking] = useState(false);
  const [expandedActivities, setExpandedActivities] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<{id: string, message: string, type: 'success' | 'error'}[]>([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTechMetrics(prev => ({
        ...prev,
        cpu: [...prev.cpu.slice(1), { timestamp: new Date().toISOString(), value: Math.floor(Math.random() * 40 + 30) }],
        cost: [...prev.cost.slice(1), { timestamp: new Date().toISOString(), value: Math.floor(Math.random() * 2000 + 1500) }]
      }));
      setTeamMetrics(prev => ({
        ...prev,
        activeTasks: Math.max(5, prev.activeTasks + (Math.random() > 0.5 ? 1 : -1))
      }));
      setLastUpdated(new Date());
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const refreshOptions = [
    { label: '1s', value: 1000 },
    { label: '5s', value: 5000 },
    { label: '30s', value: 30000 },
    { label: '1m', value: 60000 },
    { label: '1h', value: 3600000 },
    { label: '1d', value: 86400000 },
    { label: '7d', value: 604800000 },
  ];

  const toggleActivityExpansion = (id: string) => {
    const newSet = new Set(expandedActivities);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedActivities(newSet);
  };

  const handleBlockIP = (ip: string) => {
    setIsBlocking(true);
    // Simulate API call
    setTimeout(() => {
      setIpToBlock(null);
      setIsBlocking(false);
      setSuspiciousActivity(prev => prev.filter(a => a.ip !== ip));
      const id = Math.random().toString(36).substr(2, 9);
      setNotifications(prev => [...prev, { id, message: `IP ${ip} has been successfully blacklisted.`, type: 'success' }]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
    }, 1500);
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-emerald-500', 'ring-offset-4');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-emerald-500', 'ring-offset-4');
      }, 2000);
    }
  };

  const sidebarItems = [
    { id: 'overview', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview' },
    { id: 'technical', icon: <Cpu className="w-5 h-5" />, label: 'Technical' },
    { id: 'api-health', icon: <Server className="w-5 h-5" />, label: 'API Health' },
    { id: 'platforms', icon: <Smartphone className="w-5 h-5" />, label: 'Platforms' },
    { id: 'security', icon: <ShieldAlert className="w-5 h-5" />, label: 'Security' },
    { id: 'team', icon: <Users className="w-5 h-5" />, label: 'Team' },
    { id: 'revenue', icon: <DollarSign className="w-5 h-5" />, label: 'Revenue' },
    { id: 'feedback', icon: <MessageSquare className="w-5 h-5" />, label: 'Feedback' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-black font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden md:flex flex-col bg-black text-white border-r border-zinc-800 relative z-20"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-black" />
          </div>
          {isSidebarOpen && <span className="text-xl font-black tracking-tighter">cagedase</span>}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
                activeTab === item.id 
                  ? "bg-emerald-500 text-black font-bold" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              )}
            >
              <span className={cn("shrink-0", activeTab === item.id ? "text-black" : "group-hover:text-emerald-500")}>
                {item.icon}
              </span>
              {isSidebarOpen && <span>{item.label}</span>}
              {activeTab === item.id && (
                <span className="absolute right-4 w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
            {isSidebarOpen && <span>Settings</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black capitalize">{activeTab}</h2>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Live</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end mr-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Sync</span>
              <span className="text-xs font-mono text-gray-600">{lastUpdated.toLocaleTimeString()}</span>
            </div>
            
            {/* Refresh Selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />
                {refreshOptions.find(o => o.value === refreshInterval)?.label}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {refreshOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setRefreshInterval(opt.value)}
                    className={cn(
                      "w-full text-left px-4 py-2 text-xs hover:bg-emerald-50 transition-colors",
                      refreshInterval === opt.value ? "text-emerald-600 font-bold" : "text-gray-600"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden sm:flex items-center bg-gray-100 px-4 py-2 rounded-xl gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search metrics..." 
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* AI Insights Panel */}
          <motion.div 
            initial={false}
            animate={{ height: isAiPanelOpen ? 'auto' : '48px' }}
            className="bg-black text-white rounded-3xl overflow-hidden border border-zinc-800 shadow-xl relative"
          >
            <div className="p-4 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Cagedase AI Narrative Insight</span>
              </div>
              <button 
                onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                {isAiPanelOpen ? <X className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            {isAiPanelOpen && (
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-800">
                    <Terminal className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-emerald-400">
                      {activeTab === 'overview' && "System-wide performance is optimal."}
                      {activeTab === 'technical' && "Infrastructure costs are trending upwards."}
                      {activeTab === 'api-health' && "Payment Gateway is experiencing latency spikes."}
                      {activeTab === 'platforms' && "iOS churn is correlated with crash rates."}
                      {activeTab === 'security' && "Suspicious IP detected in us-east-1."}
                      {activeTab === 'team' && "Velocity is stable, but PR cycle time is increasing."}
                      {activeTab === 'revenue' && "MRR growth is accelerating in the Enterprise segment."}
                      {activeTab === 'feedback' && "Sentiment is positive, but checkout friction remains."}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                      {activeTab === 'overview' && "Across all segments, we're seeing a 12% improvement in overall efficiency. The primary driver is the recent optimization of the search engine service."}
                      {activeTab === 'technical' && "While CPU and Memory are stable, the infrastructure cost has increased by 15% this week. This is likely due to the auto-scaling of the user-profile API during peak hours."}
                      {activeTab === 'api-health' && "The Payment Gateway is currently degraded in eu-west-1. Latency has increased to 450ms, affecting 1.2% of transactions. Automated failover is being initialized."}
                      {activeTab === 'platforms' && "Web remains the strongest platform for revenue, but iOS users are reporting stability issues. The crash rate on iOS has spiked to 1.2% following the v2.4 update."}
                      {activeTab === 'security' && "IP 45.77.12.34 is showing SQL injection patterns on the /api/v1/payments endpoint. Risk score is 92. Automated IP blocking has been triggered."}
                      {activeTab === 'team' && "The team has resolved 156 bugs this sprint, but active tasks are piling up in the 'Review' stage. Suggesting a focused code-review session."}
                      {activeTab === 'revenue' && "MRR has reached $245k. The churn rate is at a healthy 2.4%, but we should monitor the Android segment where retention is slightly lower."}
                      {activeTab === 'feedback' && "Users love the new dark mode, but Sarah Miller and others are mentioning slow dashboard loading times. This aligns with the observed latency spikes in the Profile API."}
                    </p>

                    {/* Context Section */}
                    <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                            <Activity className="w-3 h-3" /> Trigger Metrics
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {activeTab === 'overview' && ['System Health: 99.9%', 'Active Users: 12.4k', 'Revenue: $14.2k'].map(m => <span key={m} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300">{m}</span>)}
                            {activeTab === 'technical' && ['CPU: 30-70%', 'Cost: +$1.5k/day'].map(m => <span key={m} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300">{m}</span>)}
                            {activeTab === 'api-health' && ['Latency: 450ms', 'Error Rate: 1.2%'].map(m => <span key={m} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300">{m}</span>)}
                            {activeTab === 'platforms' && ['iOS Crash: 1.2%', 'Web Revenue: High'].map(m => <span key={m} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300">{m}</span>)}
                            {activeTab === 'security' && ['Risk Score: 92', 'Blocked: 1,420'].map(m => <span key={m} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300">{m}</span>)}
                            {activeTab === 'team' && ['Bugs Resolved: 156', 'Active Tasks: High'].map(m => <span key={m} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300">{m}</span>)}
                            {activeTab === 'revenue' && ['MRR: $245k', 'Churn: 2.4%'].map(m => <span key={m} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300">{m}</span>)}
                            {activeTab === 'feedback' && ['Sentiment: Positive', 'Checkout Friction: High'].map(m => <span key={m} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300">{m}</span>)}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">Insight Context</h5>
                          <p className="text-[11px] text-zinc-500 leading-relaxed italic">
                            {activeTab === 'overview' && "The system is operating at peak efficiency with high availability and strong user growth across all major regions."}
                            {activeTab === 'technical' && "Resource utilization is within normal bounds, but the financial impact of auto-scaling events is becoming significant."}
                            {activeTab === 'api-health' && "Regional degradation in the payment service is causing localized transaction failures and increased retry logic overhead."}
                            {activeTab === 'platforms' && "A regression in the latest iOS build is impacting user retention, while Web performance remains a stable revenue anchor."}
                            {activeTab === 'security' && "Automated threat detection identified a high-risk IP exhibiting credential stuffing patterns on sensitive endpoints."}
                            {activeTab === 'team' && "Engineering throughput is high, but the bottleneck in the QA/Review phase is delaying feature deployment cycles."}
                            {activeTab === 'revenue' && "Strong Enterprise adoption is offsetting minor churn in the individual consumer segment, leading to overall MRR growth."}
                            {activeTab === 'feedback' && "User sentiment is buoyed by recent UI updates, though friction in the checkout flow remains a recurring pain point."}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                          <Globe className="w-3 h-3" /> Relevant Sections
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {activeTab === 'overview' && [
                            { id: 'system-health', label: 'System Health' },
                            { id: 'active-users', label: 'Active Users' },
                            { id: 'infra-load', label: 'Infrastructure Load' }
                          ].map(l => (
                            <button key={l.id} onClick={() => scrollToId(l.id)} className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 transition-colors">
                              <ArrowUpRight className="w-3 h-3" /> {l.label}
                            </button>
                          ))}
                          {activeTab === 'technical' && [
                            { id: 'system-load', label: 'System Load' },
                            { id: 'infra-cost', label: 'Infrastructure Cost' }
                          ].map(l => (
                            <button key={l.id} onClick={() => scrollToId(l.id)} className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 transition-colors">
                              <ArrowUpRight className="w-3 h-3" /> {l.label}
                            </button>
                          ))}
                          {activeTab === 'api-health' && [
                            { id: 'api-matrix', label: 'Performance Matrix' }
                          ].map(l => (
                            <button key={l.id} onClick={() => scrollToId(l.id)} className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 transition-colors">
                              <ArrowUpRight className="w-3 h-3" /> {l.label}
                            </button>
                          ))}
                          {activeTab === 'platforms' && [
                            { id: 'user-feedback', label: 'User Feedback' }
                          ].map(l => (
                            <button key={l.id} onClick={() => scrollToId(l.id)} className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 transition-colors">
                              <ArrowUpRight className="w-3 h-3" /> {l.label}
                            </button>
                          ))}
                          {activeTab === 'security' && [
                            { id: 'suspicious-tracker', label: 'Activity Tracker' },
                            { id: 'security-overview', label: 'Security Overview' }
                          ].map(l => (
                            <button key={l.id} onClick={() => scrollToId(l.id)} className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 transition-colors">
                              <ArrowUpRight className="w-3 h-3" /> {l.label}
                            </button>
                          ))}
                          {activeTab === 'team' && [
                            { id: 'team-velocity', label: 'Team Velocity' }
                          ].map(l => (
                            <button key={l.id} onClick={() => scrollToId(l.id)} className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 transition-colors">
                              <ArrowUpRight className="w-3 h-3" /> {l.label}
                            </button>
                          ))}
                          {activeTab === 'revenue' && [
                            { id: 'revenue-growth', label: 'Revenue Growth' }
                          ].map(l => (
                            <button key={l.id} onClick={() => scrollToId(l.id)} className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 transition-colors">
                              <ArrowUpRight className="w-3 h-3" /> {l.label}
                            </button>
                          ))}
                          {activeTab === 'feedback' && [
                            { id: 'user-feedback', label: 'User Feedback' }
                          ].map(l => (
                            <button key={l.id} onClick={() => scrollToId(l.id)} className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 transition-colors">
                              <ArrowUpRight className="w-3 h-3" /> {l.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {activeTab === 'overview' && (
                <>
                  {/* Top Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div id="system-health">
                      <StatCard 
                        label="System Health" 
                        value="99.9%" 
                        trend="+0.2%" 
                        icon={<Activity className="w-5 h-5" />} 
                        color="emerald"
                        isLive
                      />
                    </div>
                    <div id="active-users">
                      <StatCard 
                        label="Active Users" 
                        value="12.4k" 
                        trend="+14%" 
                        icon={<Users className="w-5 h-5" />} 
                        color="black"
                        isLive
                      />
                    </div>
                    <div id="daily-revenue">
                      <StatCard 
                        label="Daily Revenue" 
                        value="$14,200" 
                        trend="+8%" 
                        icon={<DollarSign className="w-5 h-5" />} 
                        color="emerald"
                      />
                    </div>
                    <div id="avg-latency">
                      <StatCard 
                        label="Avg Latency" 
                        value="124ms" 
                        trend="-12ms" 
                        icon={<Zap className="w-5 h-5" />} 
                        color="black"
                        isLive
                      />
                    </div>
                  </div>

                  {/* Main Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div id="infra-load" className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-lg">Infrastructure Load</h3>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="flex gap-2">
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                            <Monitor className="w-3 h-3" /> CPU
                          </span>
                          <span className="flex items-center gap-1 text-xs font-bold text-zinc-600 bg-zinc-50 px-2 py-1 rounded-md">
                            <Monitor className="w-3 h-3" /> Memory
                          </span>
                        </div>
                      </div>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={techMetrics.cpu}>
                            <defs>
                              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis 
                              dataKey="timestamp" 
                              hide 
                            />
                            <YAxis hide />
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#10b981" 
                              strokeWidth={3}
                              fillOpacity={1} 
                              fill="url(#colorCpu)"
                              isAnimationActive={true}
                              animationDuration={1000}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div id="team-velocity" className="bg-black text-white p-6 rounded-3xl shadow-xl relative">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-lg">Team Velocity</h3>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-800 rounded-full border border-zinc-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-wider">Syncing</span>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <VelocityItem label="Sprint Completion" value={teamMetrics.sprintCompletion} color="#10b981" />
                        <VelocityItem label="Bugs Resolved" value={85} color="#10b981" />
                        <VelocityItem label="Code Quality" value={92} color="#10b981" />
                        <div className="pt-4 mt-4 border-t border-zinc-800">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-sm">Active Tasks</span>
                            <motion.span 
                              key={teamMetrics.activeTasks}
                              initial={{ scale: 1.2, color: '#10b981' }}
                              animate={{ scale: 1, color: '#ffffff' }}
                              className="text-2xl font-black"
                            >
                              {teamMetrics.activeTasks}
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div id="user-feedback" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-lg">User Feedback</h3>
                        <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-gray-400" /> Real-time Feed
                        </span>
                      </div>
                      <div className="space-y-4">
                        {feedback.map((item) => (
                          <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50 transition-colors group">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                              {item.platform === 'iOS' ? <Smartphone className="w-5 h-5" /> : item.platform === 'Android' ? <Smartphone className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-sm truncate">{item.user}</h4>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">{item.timestamp}</span>
                              </div>
                              <p className="text-xs text-gray-600 line-clamp-2">{item.comment}</p>
                            </div>
                            <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                              {item.rating}★
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div id="revenue-growth" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-lg">Revenue Growth</h3>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 rounded-full border border-gray-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">Live</span>
                        </div>
                      </div>
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueMetrics.daily}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="timestamp" hide />
                            <YAxis hide />
                            <Tooltip 
                              cursor={{fill: '#f9fafb'}}
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} isAnimationActive={true} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl">
                          <div className="text-xs text-gray-500 font-bold uppercase mb-1">MRR</div>
                          <div className="text-xl font-black">${(revenueMetrics.mrr / 1000).toFixed(1)}k</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl">
                          <div className="text-xs text-gray-500 font-bold uppercase mb-1">Churn Rate</div>
                          <div className="text-xl font-black text-red-500">{revenueMetrics.churn}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'api-health' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {apiHealth.map((api) => (
                      <div key={api.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="font-bold text-sm truncate">{api.name}</div>
                          <div className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                            api.status === 'healthy' ? "bg-emerald-50 text-emerald-600" : api.status === 'degraded' ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"
                          )}>
                            {api.status}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase">Latency</div>
                            <div className="text-lg font-black">{api.latency}ms</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase">Uptime</div>
                            <div className="text-lg font-black text-emerald-600">{api.uptime}%</div>
                          </div>
                        </div>
                        <div className="mt-4 h-12 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={api.history}>
                              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} isAnimationActive={false} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div id="api-matrix" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="font-black text-lg mb-6">API Performance Matrix</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-4 font-bold text-sm text-gray-400 uppercase tracking-wider">Service</th>
                            <th className="pb-4 font-bold text-sm text-gray-400 uppercase tracking-wider">Region</th>
                            <th className="pb-4 font-bold text-sm text-gray-400 uppercase tracking-wider">RPS</th>
                            <th className="pb-4 font-bold text-sm text-gray-400 uppercase tracking-wider">Error Rate</th>
                            <th className="pb-4 font-bold text-sm text-gray-400 uppercase tracking-wider">Trend</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {apiHealth.map((api) => (
                            <tr key={api.id} className="group hover:bg-gray-50 transition-colors">
                              <td className="py-4 font-bold">{api.name}</td>
                              <td className="py-4 text-sm text-gray-500 font-mono">{api.region}</td>
                              <td className="py-4 font-black">{api.rps.toLocaleString()}</td>
                              <td className="py-4">
                                <span className={cn(
                                  "font-bold",
                                  api.errorRate > 1 ? "text-red-500" : "text-emerald-500"
                                )}>
                                  {api.errorRate}%
                                </span>
                              </td>
                              <td className="py-4">
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'technical' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div id="system-load" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                      <h3 className="font-black text-lg mb-6">System Load (CPU/Memory)</h3>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={techMetrics.cpu}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="timestamp" hide />
                            <YAxis hide />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={3} isAnimationActive={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div id="infra-cost" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-6">
                        <DollarSign className="w-5 h-5 text-emerald-500" />
                        <h3 className="font-black text-lg">Infrastructure Cost Over Time</h3>
                      </div>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={techMetrics.cost}>
                            <defs>
                              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="timestamp" hide />
                            <YAxis hide />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#f87171" fill="url(#colorCost)" strokeWidth={3} isAnimationActive={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div id="suspicious-tracker" className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                      <h3 className="font-black text-lg mb-6">Suspicious Activity Tracker</h3>
                      <div className="space-y-4">
                        {suspiciousActivity.map((activity) => {
                          const isHighRisk = activity.riskScore > 80;
                          const isExpanded = expandedActivities.has(activity.id);
                          
                          return (
                            <div key={activity.id} className="space-y-2">
                              <div 
                                className={cn(
                                  "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden",
                                  isHighRisk 
                                    ? "bg-red-50/50 border-red-100 hover:border-red-300 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                                    : "bg-gray-50 border-gray-100 hover:border-gray-300"
                                )}
                                onClick={() => toggleActivityExpansion(activity.id)}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center relative",
                                    isHighRisk ? "bg-red-100 text-red-600" : "bg-yellow-50 text-yellow-600"
                                  )}>
                                    <AlertTriangle className="w-6 h-6" />
                                    {isHighRisk && (
                                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-bold text-sm flex items-center gap-2">
                                      {activity.ip}
                                      {isHighRisk && <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter">Critical</span>}
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono">{activity.endpoint}</div>
                                  </div>
                                </div>
                                <div className="hidden sm:block text-right">
                                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Behavior</div>
                                  <div className={cn("text-sm font-bold", isHighRisk ? "text-red-600" : "text-yellow-600")}>
                                    {activity.behavior}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Risk Score</div>
                                  <div className={cn("text-lg font-black", isHighRisk ? "text-red-600" : "text-gray-900")}>
                                    {activity.riskScore}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIpToBlock(activity.ip);
                                    }}
                                    className="p-2 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                  >
                                    <ShieldAlert className="w-4 h-4" />
                                  </button>
                                  <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isExpanded && "rotate-180")} />
                                </div>
                              </div>

                              {isExpanded && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-inner space-y-4 ml-4 mt-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <motion.div 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="space-y-2"
                                      >
                                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Observed Patterns</h5>
                                        <div className="flex flex-wrap gap-2">
                                          {activity.details.patterns.map((p, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600">
                                              {p}
                                            </span>
                                          ))}
                                        </div>
                                      </motion.div>
                                      <motion.div 
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-2"
                                      >
                                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Historical Context</h5>
                                        <p className="text-xs text-gray-600 leading-relaxed italic">
                                          {activity.details.historicalContext}
                                        </p>
                                      </motion.div>
                                    </div>
                                    <motion.div 
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.3 }}
                                      className="pt-4 border-t border-gray-50 space-y-4"
                                    >
                                      <div>
                                        <h5 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">Potential Impact</h5>
                                        <p className="text-xs text-gray-600 font-medium">
                                          {activity.details.potentialImpact}
                                        </p>
                                      </div>
                                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                        <h5 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                                          <ShieldAlert className="w-3 h-3" /> Recommended Action
                                        </h5>
                                        <p className="text-xs text-emerald-800 font-bold">
                                          {activity.details.recommendedAction}
                                        </p>
                                      </div>
                                    </motion.div>
                                    <motion.div 
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.4 }}
                                      className="flex items-center gap-4 pt-2"
                                    >
                                      <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">Requests</span>
                                        <span className="text-sm font-black">{activity.requestCount.toLocaleString()}</span>
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">First Seen</span>
                                        <span className="text-sm font-black">{activity.timestamp}</span>
                                      </div>
                                    </motion.div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div id="security-overview" className="bg-black text-white p-6 rounded-3xl shadow-xl">
                      <h3 className="font-black text-lg mb-6">Security Overview</h3>
                      <div className="space-y-6">
                        <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                          <div className="text-xs text-zinc-500 font-bold uppercase mb-1">Threat Level</div>
                          <div className="text-2xl font-black text-yellow-500">ELEVATED</div>
                        </div>
                        <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                          <div className="text-xs text-zinc-500 font-bold uppercase mb-1">Blocked IPs (24h)</div>
                          <div className="text-2xl font-black">1,420</div>
                        </div>
                        <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                          <div className="text-xs text-zinc-500 font-bold uppercase mb-1">DDoS Mitigation</div>
                          <div className="text-2xl font-black text-emerald-500">ACTIVE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!['overview', 'api-health', 'platforms', 'security', 'technical'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <Settings className="w-10 h-10 text-emerald-600 animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">Detailed {activeTab} View</h3>
                  <p className="text-gray-500 max-w-md">
                    This section is currently being optimized. Detailed metrics for {activeTab} will be available in the next automated update.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Block IP Confirmation Modal */}
      <AnimatePresence>
        {ipToBlock && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIpToBlock(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl border border-gray-100"
            >
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-2">Confirm IP Block</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Are you sure you want to block <span className="font-mono font-bold text-black">{ipToBlock}</span>? 
                This will immediately terminate all active sessions and prevent future access from this address.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIpToBlock(null)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleBlockIP(ipToBlock)}
                  disabled={isBlocking}
                  className={cn(
                    "flex-1 px-6 py-4 rounded-2xl font-bold bg-red-600 text-white transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2",
                    isBlocking ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700"
                  )}
                >
                  {isBlocking ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Blocking...
                    </>
                  ) : "Confirm Block"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <div className="fixed bottom-6 right-6 z-[110] space-y-3">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={cn(
                "px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 min-w-[300px]",
                n.type === 'success' ? "bg-black text-white border-zinc-800" : "bg-red-600 text-white border-red-500"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                n.type === 'success' ? "bg-emerald-500 text-black" : "bg-white text-red-600"
              )}>
                {n.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-widest opacity-50">System Notification</div>
                <div className="text-sm font-bold">{n.message}</div>
              </div>
              <button onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))}>
                <X className="w-4 h-4 opacity-50 hover:opacity-100" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon, color, isLive }: { label: string, value: string, trend: string, icon: React.ReactNode, color: 'emerald' | 'black', isLive?: boolean }) {
  const isPositive = trend.startsWith('+');
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative group overflow-hidden"
    >
      {isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-tighter">Live</span>
        </div>
      )}
      
      {/* Subtle update flash */}
      <motion.div
        key={value}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-emerald-500 pointer-events-none"
      />

      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          color === 'emerald' ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-black"
        )}>
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{label}</div>
      <motion.div 
        key={value}
        initial={isLive ? { opacity: 0.5, y: 2 } : false}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black tracking-tight"
      >
        {value}
      </motion.div>
    </motion.div>
  );
}

function VelocityItem({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold">
        <span className="text-zinc-400 uppercase tracking-wider">{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
