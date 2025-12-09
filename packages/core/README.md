# @melya/core

Shared types, utilities, and scoring logic for Melya monorepo.

## Purpose

This package contains:
- **Types**: TypeScript interfaces and enums shared between frontend and backend
- **Scoring**: Questionnaire scoring algorithms (BDI, STAI, etc.)
- **Utils**: Common utility functions

## Usage

```typescript
import { calculateScore, ScoreResult, SessionStatus } from '@melya/core';

// In API or Web
const score = calculateScore(questionnaire, answers);
```

## Development

```bash
# Build the package
npm run build

# Watch mode
npm run dev
```

## Structure

```
src/
├── types/          # Shared TypeScript types
├── scoring/        # Scoring algorithms
├── utils/          # Utility functions
└── index.ts        # Main export
```

