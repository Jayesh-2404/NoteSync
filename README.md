# AI PDF Note Taker

An intelligent web application that helps users extract and organize notes from PDF documents using AI. Built with Next.js, this application provides a modern and intuitive interface for managing PDF documents and their extracted notes.

## Features

- 📄 PDF Document Upload and Management
- 🤖 AI-Powered Note Extraction
- 📝 Rich Text Editor for Note Organization
- 🔒 User Authentication with Clerk
- 💾 Real-time Data Storage with Convex
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive Design

## Tech Stack

- **Frontend Framework**: Next.js 15
- **Authentication**: Clerk
- **Database**: Convex
- **AI Integration**: 
  - Google Generative AI
  - LangChain
- **UI Components**:
  - Radix UI
  - TipTap Editor
  - Tailwind CSS
- **PDF Processing**: pdf-parse

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Convex account
- Clerk account
- Google AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-pdf-note-taker.git
cd ai-pdf-note-taker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CONVEX_URL=your_convex_url
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Sign in to your account
2. Upload a PDF document
3. Wait for the AI to process and extract notes
4. Edit and organize your notes using the rich text editor
5. Save and manage your notes for future reference

