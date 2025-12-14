# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

**Do not open a public issue.**

If you discover a security vulnerability in Brain Dump 2.0, please report it privately.

1. Email the repository owner at [insert-email-here].
2. Provide a detailed description of the vulnerability and steps to reproduce.
3. We will respond within 48 hours to acknowledge receipt.

## API Keys

- This application uses Google Gemini API keys.
- **NEVER** commit your `.env` file or expose your API keys in public repositories.
- The `API_KEY` environment variable is intended to be used on the server-side or securely injected during the build process.

## Data Privacy

- This application sends user input to Google's Generative AI servers.
- Please review [Google's Generative AI Terms of Service](https://policies.google.com/terms) regarding data usage.
- Do not input sensitive personal identification information (PII), passwords, or financial data into the prompt.
