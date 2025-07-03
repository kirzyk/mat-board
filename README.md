# MatBoard 🎯

> _"Because every company needs a board to manage their mats... or was it orders? 🤔"_

## What's Inside 🎁

- **Authentication System**: Because we can't have just anyone managing mats... I mean orders
- **Search & Filter**: Find that needle in the haystack (or that specific order in the chaos)
- **Pagination**: Because nobody likes scrolling through 10,000 orders
- **Modern UI**: Material Design that makes your eyes happy
- **Responsive Design**: Works on desktop, tablet, and probably your smart fridge

## Tech Stack 🛠️

- **Angular 19** - Because we like to live on the edge
- **Angular Material** - For that sweet, sweet Material Design
- **RxJS** - Reactive programming that's actually fun
- **TypeScript** - Because `any` is not a type (fight me)
- **UUID** - For generating unique IDs that are actually unique
- **LocalStorage** - Because we're keeping it simple (and offline-friendly)

## Getting Started 🚀

### Prerequisites

- Node.js (version that's not too old, not too new, just right)
- npm or yarn (pick your poison)

### Installation

```bash
# Clone this masterpiece
git clone <repository-url>
cd mat-board

# Install dependencies
npm install

# Start the development server
ng serve
```

Navigate to `http://localhost:4200/`

## Project Structure 📁

```
src/app/
├── auth/           # Authentication (mock, but still counts!)
├── orders/         # The main event - order management
│   ├── add-order-dialog/  # Modal for adding orders
│   ├── interfaces/        # TypeScript interfaces
│   ├── list/             # Orders list with search & pagination
│   └── services/         # Business logic
└── assets/         # Images and other static files
```

## Development Commands 🛠️

```bash
# Start development server
ng serve

# Build for production
ng build

# Run tests (if you're into that sort of thing)
ng test


```

---

**Built with ❤️ and ☕ for a company that knows how to interview**
