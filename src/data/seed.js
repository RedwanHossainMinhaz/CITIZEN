// ---------------------------------------------------------------------------
// Starter data. Feel free to edit any of this — it only seeds the app the
// very first time it runs (or after "Reset demo data" in Admin > Settings).
// ---------------------------------------------------------------------------

export const SEED_USERS = [
  {
    id: 'user_admin',
    name: 'Admin',
    email: 'admin@citizen.bd',
    password: 'admin123', // demo only — see README for production notes
    nid: '19850000000012',
    ward: 'Ward 1, DNCC',
    trustScore: 100,
    role: 'admin',
    banned: false,
    avatar: '',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'user_ahmed',
    name: 'Ahmed Reza',
    email: 'demo@citizen.bd',
    password: 'demo1234',
    nid: '1990********45',
    ward: 'Ward 14, DNCC',
    trustScore: 98,
    role: 'user',
    banned: false,
    avatar: '',
    createdAt: '2025-02-14T00:00:00.000Z',
  },
  {
    id: 'user_rahim',
    name: 'Rahim Chowdhury',
    email: 'rahim@example.com',
    password: 'password123',
    nid: '1992********11',
    ward: 'Ward 9, DNCC',
    trustScore: 91,
    role: 'user',
    banned: false,
    avatar: '',
    createdAt: '2025-03-01T00:00:00.000Z',
  },
  {
    id: 'user_green',
    name: 'Green BD',
    email: 'green_bd@example.com',
    password: 'password123',
    nid: '1988********02',
    ward: 'Ward 5, DSCC',
    trustScore: 87,
    role: 'user',
    banned: false,
    avatar: '',
    createdAt: '2025-03-10T00:00:00.000Z',
  },
];

export const SEED_POSTS = [
  {
    id: 'post_1',
    category: 'Infrastructure',
    authorId: 'user_rahim',
    authorName: 'rahim_dhk',
    title: 'Proposal: Expanding the BRT line to Gazipur outskirts',
    body:
      "Given the current traffic situation in the northern corridor, extending the proposed BRT line further into Gazipur could significantly reduce commute times for thousands of daily workers. I've reviewed the preliminary feasibility studies and noticed a gap...",
    tags: ['Urban Planning', 'Transport'],
    upvotes: 1200,
    comments: 248,
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    id: 'post_2',
    category: 'Environment',
    authorId: 'user_green',
    authorName: 'green_bd',
    title: 'Community cleanup drive organized for Dhanmondi Lake this weekend',
    body: 'Join us this Saturday morning for a community-led cleanup of Dhanmondi Lake. Gloves, bags and refreshments provided.',
    tags: ['Event', 'Action Needed'],
    upvotes: 856,
    comments: 112,
    createdAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
  },
];

export const SEED_COMPLAINTS = [
  {
    id: 'C-892',
    category: 'Infrastructure',
    details: 'Broken streetlight on Road 4, Ward 14 has been out for two weeks.',
    userId: 'user_ahmed',
    userName: 'Ahmed Reza',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'C-901',
    category: 'Health & Sanitation',
    details: 'Waste has not been collected from the corner bin in over a week.',
    userId: 'user_ahmed',
    userName: 'Ahmed Reza',
    status: 'Assigned',
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
  },
];

export const SEED_SETTINGS = {
  siteName: 'CITIZEN',
  tagline: 'Your Voice Matters.',
  description:
    'Empowering Bangladeshi citizens to actively participate in shaping their communities. Submit feedback, join discussions, and drive progress through transparent civic dialogue.',
  // ---- EASY TO CUSTOMIZE: swap these for your own images from Admin > Site Settings ----
  logo: '', // empty = use the built-in <Logo /> component
  heroImage: '',
  stats: {
    registeredCitizens: 124000,
    issuesResolved: 8452,
    partnerAgencies: 45,
  },
  trendingTopics: [
    { id: 't1', rank: 1, category: 'Healthcare', title: 'Dengue Prevention Measures in Wards 10-15', posts: '3.4k' },
    { id: 't2', rank: 2, category: 'Education', title: 'Digital Literacy Workshops Funding', posts: '2.1k' },
    { id: 't3', rank: 3, category: 'Transport', title: 'Metro Rail Schedule Updates', posts: '1.8k' },
    { id: 't4', rank: 4, category: 'Local Business', title: 'SME Support Grants Application Open', posts: '950' },
  ],
  communityRules: [
    'Be respectful and constructive.',
    'Verify facts before posting claims.',
    'Keep discussions relevant to local civic issues.',
    'No hate speech or harassment.',
    'Protect personal privacy (no doxxing).',
  ],
};
