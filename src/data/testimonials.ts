/** Client testimonials — mix of Upwork-style feedback + automation-focused variations. */

export type Testimonial = {
  id: string
  quote: string
  attribution: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Top-notch work, great communication, very fast delivery.',
    attribution: 'Verified Upwork client',
    role: 'Automation · Data workflow',
  },
  {
    id: 't2',
    quote:
      'Shipped a resilient Python scraper with clean logging and retries — zero hand-holding, production-ready on day one.',
    attribution: 'Growth lead',
    role: 'Web scraping · Lead lists',
  },
  {
    id: 't3',
    quote:
      'Turned our brittle spreadsheet chaos into a scheduled pipeline — exports land in Slack before we even ask.',
    attribution: 'Operations director',
    role: 'Python · ETL · Reporting',
  },
  {
    id: 't4',
    quote:
      'Best communication on the platform: crisp updates, proactive edge-case handling, and fast iterations.',
    attribution: 'Startup founder',
    role: 'API integration · QA',
  },
  {
    id: 't5',
    quote:
      'Built a lead-enrichment flow that survived messy vendor HTML — accuracy improved overnight.',
    attribution: 'B2B sales manager',
    role: 'Scraping · Lead generation',
  },
  {
    id: 't6',
    quote:
      'Clear architecture docs, sensible defaults, and code our team can extend without fear.',
    attribution: 'Engineering manager',
    role: 'Python · FastAPI · AWS',
  },
  {
    id: 't7',
    quote:
      'Automated marketplace repricing and alerts — saved hours daily with measurable ROI.',
    attribution: 'E‑commerce operator',
    role: 'Automation · Monitoring',
  },
  {
    id: 't8',
    quote:
      'Exceptional attention to detail on anti-bot paths — polite scraping that stays within policy.',
    attribution: 'Compliance-focused PM',
    role: 'Playwright · Proxies',
  },
  {
    id: 't9',
    quote:
      'Delivered SQL-backed dashboards fed by Python workers — stakeholders finally trust the numbers.',
    attribution: 'Finance analyst',
    role: 'SQL · Pipelines · Viz',
  },
  {
    id: 't10',
    quote:
      'From vague brief to working MVP in days — proactive, transparent, and ruthlessly efficient.',
    attribution: 'Product owner',
    role: 'Python · Scraping · Launch',
  },
]
