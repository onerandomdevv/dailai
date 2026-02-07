# DialAI Frontend

This is the demo-day presentation website for DialAI, built with Next.js and TailwindCSS.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── components/          # All React components
│   │   ├── Hero.tsx        # Hero section
│   │   ├── WhatIsDialAI.tsx # Problem & solution
│   │   ├── HowItWorks.tsx  # 4-step flow
│   │   ├── Features.tsx    # Core features
│   │   ├── Manual.tsx      # Usage instructions
│   │   ├── Demo.tsx        # Phone mockups
│   │   ├── TechStack.tsx   # Technologies used
│   │   └── Footer.tsx      # Footer
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration
```

## 🎨 Sections

1. **Hero** - Project name, tagline, and CTA buttons
2. **What is DialAI?** - Problem statement and solution
3. **How DialAI Works** - 4-step user journey
4. **Features** - Health, Translation, Guide, Voice AI
5. **How to Use** - Step-by-step manual for USSD and Voice
6. **Demo** - Phone mockups showing USSD menu and SMS response
7. **Tech Stack** - Technologies used to build DialAI
8. **Footer** - Copyright and tagline

## 🛠️ Built With

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **ESLint** - Code linting

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

This Next.js app can be deployed to:
- **Vercel** (Recommended - one-click deploy)
- **Netlify**
- **Railway**
- **Any Node.js hosting**

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

## 📝 Customization

- **Colors**: Edit `tailwind.config.ts` to change the color scheme
- **Content**: Modify component files in `app/components/`
- **Fonts**: Update `app/layout.tsx` to add custom fonts

## 🎯 Demo Day Tips

- Use the smooth scroll navigation (click "See How It Works")
- Highlight the phone mockups in the Demo section
- Emphasize the "0 Data Required" stat
- Show the safety note to demonstrate responsible AI

---

Built with ❤️ for Africa's Talking Hackathon
