export type Project = {
  title: string
  description: string
  tech: string[]
}

export const projects: Project[] = [
  {
    title: 'Retail Inventory Intelligence',
    description:
      'Logic for identifying profit leakage across $3.8M+ business data.',
    tech: ['Python', 'Pandas'],
  },
  {
    title: 'Binance Spot Grid Bot',
    description:
      'Automated trading bot using CCXT for real-time strategy execution.',
    tech: ['CCXT', 'API'],
  },
  {
    title: 'Oligoscan PDF Automation',
    description:
      'Medical data extraction system converting complex PDFs to structured data.',
    tech: ['Python', 'Data Mining'],
  },
  {
    title: 'E-Commerce Revenue Intelligence',
    description:
      'Tracking low-margin products and inventory risks for revenue optimization.',
    tech: ['Data Engineering'],
  },
  {
    title: 'FastAPI Export & Data Pipeline',
    description:
      'High-performance backend for large-scale automated business workflows.',
    tech: ['FastAPI', 'REST'],
  },
  {
    title: 'Instagram Profile Extractor',
    description:
      'Advanced automation for structured profile data collection.',
    tech: ['Selenium', 'Playwright'],
  },
  {
    title: 'SEO Automation Tool PRO',
    description:
      'Desktop automation for SEO auditing and keyword tracking.',
    tech: ['Python', 'Automation'],
  },
  {
    title: 'eBay Listing Automation',
    description:
      'Spreadsheet-to-Marketplace pipeline for automated inventory sync.',
    tech: ['Web Scraping'],
  },
  {
    title: 'AI Content Pipeline',
    description:
      'Automated bulk content generation using OpenAI APIs.',
    tech: ['OpenAI', 'Python'],
  },
  {
    title: 'Excel Cleaner Pro',
    description:
      'Professional tool for standardizing and cleaning messy business Excel datasets.',
    tech: ['Pandas'],
  },
]
