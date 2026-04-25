import './globals.css'

export const metadata = {
  title: 'Evalia — AI-Powered Feedback & Marking for Australian Educators',
  description:
    'Evalia helps tutoring centres and small schools deliver faster, richer student feedback. AI suggests mark ranges and reasoning — teachers stay in control.',
  keywords: 'AI marking, student feedback, tutoring software, teacher tools, Australian edtech',
  openGraph: {
    title: 'Evalia — Teacher-First AI Feedback Platform',
    description:
      'AI-powered marking support and reporting for Australian tutoring centres and small schools.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
