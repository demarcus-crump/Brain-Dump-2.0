# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Voice Mode**: Integration with Gemini Live API for real-time audio input.
- **History Tab**: View previous brain dumps stored in local storage.

## [2.0.0] - 2025-05-15

### Added
- **5-Agent Pipeline**: Full implementation of Listie, Linky, Wordy, Sparky, and Blendy.
- **Processing Theater**: Cinematic visualization of the thought process.
- **Ambiguity Check**: HitL (Human-in-the-Loop) modal for clarifying vague inputs.
- **Refinement Chat**: Post-processing conversation with Blendy.
- **Gamification**: Clarity Score and Badging system.
- **UI Overhaul**: Dark mode, kinetic typography, magnetic buttons.

### Fixed
- Reduced "flashing" on Agent Listie's animation during the working state.
- Smoothed out the progress bar bobbing animation.

### Changed
- Migrated from generic prompt chaining to structured `gemini-2.5-flash` and `gemini-3-pro-preview` calls.
- Updated `AgentDisplay` to use Framer Motion `motionValues` for performance optimization.
