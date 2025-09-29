# SVG Component Generator

A modern, professional tool for converting SVG files into React, Vue, and Svelte components with syntax highlighting and PNG export capabilities.

Built by [Antlers Labs](https://antlerslabs.com) - Crafting exceptional developer experiences.

## ✨ Features

- **Multi-Framework Support**: Generate components for React, Vue, and Svelte
- **Dual Input Methods**: Upload SVG files or paste SVG code directly
- **Syntax Highlighting**: Beautiful code display with Shiki-powered highlighting
- **SVG Optimization**: Built-in SVG optimization and cleanup
- **TypeScript Support**: Optional TypeScript interfaces and types
- **Props Customization**: Configurable component props for styling
- **PNG Export**: Convert SVG to PNG for download
- **Modern UI**: Clean, minimal, corporate-grade interface
- **Real-time Preview**: Instant preview of your SVG and generated code

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/antlerslabs/svg-react.git
cd svg-react.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Kibo UI
- **Syntax Highlighting**: Shiki
- **Icons**: Lucide React + React Icons
- **TypeScript**: Full type safety
- **SVG Processing**: Custom optimization utilities

## 📖 Usage

1. **Upload or Paste**: Choose between uploading an SVG file or pasting SVG code
2. **Configure**: Set your component name and select the target framework
3. **Customize**: Choose generation options (optimization, TypeScript, props)
4. **Generate**: Click generate to create your component
5. **Copy & Use**: Copy the generated code and use it in your project

## 🎨 Supported Frameworks

- **React**: TypeScript JSX components with props
- **Vue**: Single File Components with TypeScript support
- **Svelte**: Svelte components with TypeScript

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   └── ui/               # UI component library
├── lib/                  # Utility functions
│   ├── svg-utils.ts      # SVG processing utilities
│   └── component-generators.ts # Component generation logic
└── public/               # Static assets
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Antlers Labs

Built with ❤️ by [Antlers Labs](https://antlerslabs.com)

- Website: [antlerslabs.com](https://antlerslabs.com)
- Twitter: [@antlerslabs](https://twitter.com/antlerslabs)
- GitHub: [@antlerslabs](https://github.com/antlerslabs)

---

*Crafting exceptional developer experiences, one tool at a time.*
