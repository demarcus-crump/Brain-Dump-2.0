# Brain Dump 2.0 🧠

![Status](https://img.shields.io/badge/Status-Beta-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Gemini](https://img.shields.io/badge/AI-Gemini%20Pro-8E75B2)

**You spill it. We distill it.**

Brain Dump 2.0 is an immersive, AI-powered thought processing tool designed to transform your unstructured, messy ideas into clear, actionable insights. Unlike standard chat interfaces, it uses a theatrical **5-Agent Pipeline** to visualize the cognitive process of decluttering your mind.

---

## 🚀 Features

### ✅ Implemented
- **The 5-Agent Pipeline**: A sequential processing system where specialized AI agents handle specific cognitive tasks:
  - **Listie (The Decoder)**: Separates context/data from actionable instructions.
  - **Linky (The Signal Detector)**: Finds recurring patterns and signals in the noise.
  - **Wordy (The Observer)**: Collapses vague possibilities into concrete realities.
  - **Sparky (The Game Theorist)**: Detects bluffing and hidden fears.
  - **Blendy (The Architect)**: Synthesizes everything into a reliable system.
- **Theatrical UI**: "Processing Theater" visualizes the AI's thought process in real-time with rich animations.
- **Ambiguity Check (HITL)**: Proactively asks clarifying questions if your input is too vague before processing.
- **Gamified Insights**: Generates a "Clarity Score", awards badges, and provides actionable key points.
- **Conversational Refinement**: Chat with Blendy to tweak or refine the generated plan.
- **Immersive Design**: Kinetic typography, magnetic buttons, custom cursors, and parallax effects.

### 🚧 Planned / In Progress
- **Voice Mode**: Real-time voice input using Gemini Live API.
- **Export Integrations**: Direct export to Notion, Obsidian, and Trello.
- **History**: Local storage persistence for past dumps.

---

## 🛠️ Prerequisites

- **Node.js**: v18 or higher
- **Google Cloud Project**: You need a valid API Key with access to `gemini-2.5-flash` and `gemini-3-pro-preview`.

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/[YOUR-USERNAME]/brain-dump-2.git
   cd brain-dump-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_google_gemini_api_key_here
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```
   Open `http://localhost:1234` (or port specified by bundler) to view the app.

---

## 📖 Usage

1. **The Dump**: Type your messy, unstructured thought into the main input field. Don't worry about grammar or structure.
2. **Ambiguity Check**: If your thought is too vague (e.g., "I need help"), Listie will interrupt to ask a clarifying question.
3. **The Theater**: Watch the 5 agents process your thought sequentially.
4. **The Reveal**: Review your Mission Report, Clarity Score, and Badges.
5. **Refine**: Use the chat bar at the bottom to ask Blendy to tweak specific parts of the plan.

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and the code of conduct.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Google Gemini API](https://ai.google.dev/)
- UI powered by [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)
