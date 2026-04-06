export interface Metric {
  timestamp: string;
  value: number;
}

export interface TechnicalMetrics {
  cpu: Metric[];
  memory: Metric[];
  latency: Metric[];
  errorRate: Metric[];
  cost: Metric[];
}

export interface TeamMetrics {
  velocity: number;
  sprintCompletion: number;
  activeTasks: number;
  bugsResolved: number;
}

export interface RevenueMetrics {
  daily: Metric[];
  mrr: number;
  churn: number;
}

export interface Feedback {
  id: string;
  user: string;
  platform: 'iOS' | 'Android' | 'Web';
  comment: string;
  rating: number;
  timestamp: string;
}

export interface ApiHealth {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  rps: number;
  uptime: number;
  errorRate: number;
  region: string;
  history: Metric[];
}

export interface PlatformMetrics {
  name: string;
  dau: Metric[];
  crashRate: Metric[];
  revenue: Metric[];
  activeUsers: number;
  newUsers: number;
}

export interface SuspiciousActivity {
  id: string;
  ip: string;
  endpoint: string;
  behavior: string;
  riskScore: number;
  timestamp: string;
  requestCount: number;
  details: {
    patterns: string[];
    historicalContext: string;
    potentialImpact: string;
    recommendedAction: string;
  };
}

const generateTimeSeries = (points: number, min: number, max: number): Metric[] => {
  return Array.from({ length: points }).map((_, i) => ({
    timestamp: new Date(Date.now() - (points - i) * 3600000).toISOString(),
    value: Math.floor(Math.random() * (max - min + 1) + min),
  }));
};

export const getMockTechnicalMetrics = (): TechnicalMetrics => ({
  cpu: generateTimeSeries(24, 10, 85),
  memory: generateTimeSeries(24, 30, 95),
  latency: generateTimeSeries(24, 50, 450),
  errorRate: generateTimeSeries(24, 0, 5),
  cost: generateTimeSeries(12, 1000, 5000),
});

export const getMockTeamMetrics = (): TeamMetrics => ({
  velocity: 42,
  sprintCompletion: 88,
  activeTasks: 12,
  bugsResolved: 156,
});

export const getMockRevenueMetrics = (): RevenueMetrics => ({
  daily: generateTimeSeries(30, 5000, 15000),
  mrr: 245000,
  churn: 2.4,
});

export const getMockFeedback = (): Feedback[] => [
  { id: '1', user: 'Alex Chen', platform: 'iOS', comment: 'The new update is incredibly fast!', rating: 5, timestamp: '2h ago' },
  { id: '2', user: 'Sarah Miller', platform: 'Web', comment: 'Dashboard loading takes a bit too long.', rating: 3, timestamp: '4h ago' },
  { id: '3', user: 'Mike Ross', platform: 'Android', comment: 'Love the dark mode implementation.', rating: 5, timestamp: '6h ago' },
  { id: '4', user: 'Elena K.', platform: 'Web', comment: 'Integration was seamless. Plug and play indeed.', rating: 5, timestamp: '8h ago' },
];

export const getMockApiHealth = (): ApiHealth[] => [
  { id: '1', name: 'Auth Service', status: 'healthy', latency: 45, rps: 1200, uptime: 99.99, errorRate: 0.01, region: 'us-east-1', history: generateTimeSeries(10, 40, 60) },
  { id: '2', name: 'Payment Gateway', status: 'degraded', latency: 450, rps: 850, uptime: 98.5, errorRate: 1.2, region: 'eu-west-1', history: generateTimeSeries(10, 300, 600) },
  { id: '3', name: 'User Profile API', status: 'healthy', latency: 32, rps: 3400, uptime: 99.95, errorRate: 0.05, region: 'us-west-2', history: generateTimeSeries(10, 25, 45) },
  { id: '4', name: 'Search Engine', status: 'healthy', latency: 88, rps: 5600, uptime: 99.9, errorRate: 0.1, region: 'ap-southeast-1', history: generateTimeSeries(10, 70, 110) },
];

export const getMockPlatformMetrics = (): PlatformMetrics[] => [
  { name: 'iOS', dau: generateTimeSeries(24, 5000, 8000), crashRate: generateTimeSeries(24, 0, 1), revenue: generateTimeSeries(24, 2000, 4000), activeUsers: 12400, newUsers: 450 },
  { name: 'Android', dau: generateTimeSeries(24, 4000, 7000), crashRate: generateTimeSeries(24, 0, 2), revenue: generateTimeSeries(24, 1500, 3500), activeUsers: 10200, newUsers: 320 },
  { name: 'Web', dau: generateTimeSeries(24, 8000, 12000), crashRate: generateTimeSeries(24, 0, 0.5), revenue: generateTimeSeries(24, 5000, 9000), activeUsers: 24500, newUsers: 890 },
  { name: 'Desktop', dau: generateTimeSeries(24, 2000, 4000), crashRate: generateTimeSeries(24, 0, 0.2), revenue: generateTimeSeries(24, 1000, 2000), activeUsers: 5600, newUsers: 120 },
];

export const getMockSuspiciousActivity = (): SuspiciousActivity[] => [
  { 
    id: '1', 
    ip: '192.168.1.105', 
    endpoint: '/api/v1/auth/login', 
    behavior: 'Brute force attempt', 
    riskScore: 85, 
    timestamp: '2m ago', 
    requestCount: 450,
    details: {
      patterns: ['Rapid sequential login failures', 'Multiple username attempts', 'Non-standard user-agent'],
      historicalContext: 'IP previously flagged for similar activity in us-west-2 last month.',
      potentialImpact: 'Account takeover risk for multiple users. Potential for unauthorized data access.',
      recommendedAction: 'Enable mandatory MFA for all accounts accessed by this IP and trigger a password reset for affected users.'
    }
  },
  { 
    id: '2', 
    ip: '45.77.12.34', 
    endpoint: '/api/v1/payments', 
    behavior: 'SQL injection pattern', 
    riskScore: 92, 
    timestamp: '5m ago', 
    requestCount: 12,
    details: {
      patterns: ["OR '1'='1' detected in query params", "UNION SELECT attempts", "Database schema probing"],
      historicalContext: 'New IP from a high-risk hosting provider. No previous history with this service.',
      potentialImpact: 'Critical. Database breach potential. Exposure of sensitive financial data.',
      recommendedAction: 'Immediately blacklist IP at the WAF level and audit database logs for any successful exfiltration.'
    }
  },
  { 
    id: '3', 
    ip: '103.21.244.0', 
    endpoint: '/api/v1/users/export', 
    behavior: 'Unusual data volume', 
    riskScore: 78, 
    timestamp: '12m ago', 
    requestCount: 5,
    details: {
      patterns: ['Large JSON payload requests', 'Accessing multiple user records in seconds', 'Bypassing pagination'],
      historicalContext: 'IP belongs to a known VPN provider. Frequent use by legitimate users but currently showing anomalous behavior.',
      potentialImpact: 'Data exfiltration. Bulk scraping of user profiles and private information.',
      recommendedAction: 'Implement rate limiting on the export endpoint and verify the identity of the user associated with these requests.'
    }
  },
  { 
    id: '4', 
    ip: '185.191.171.33', 
    endpoint: '/api/v1/search', 
    behavior: 'Aggressive scraping', 
    riskScore: 65, 
    timestamp: '15m ago', 
    requestCount: 2400,
    details: {
      patterns: ['High RPS (Requests Per Second)', 'Iterative search query patterns', 'Ignoring robots.txt directives'],
      historicalContext: 'Known search engine crawler IP, but currently exceeding rate limits by 500%.',
      potentialImpact: 'Denial of Service (DoS) risk for the search service. Intellectual property theft.',
      recommendedAction: 'Contact the crawler owner to adjust their crawl rate and implement a temporary block if service degradation continues.'
    }
  },
];
