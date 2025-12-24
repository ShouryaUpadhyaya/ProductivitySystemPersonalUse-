# Habit & Focus Engine

A minimal, data-driven workspace that turns 25-minute focus blocks and 21-day habit streaks into measurable progress. Built for people who want to track without clutter and improve without guesswork.

## Stack

**Backend**  
- Express + Prisma + PostgreSQL  
- JWT auth, rate-limited, WebSocket timer sync  

**Frontend**  
- Next.js 15 + Zustand + Tailwind + Recharts  

**AI layer**  
- API for weekly insight reports and goal coaching  

## Core Loops

1. **Pomodoro subject timer**  
   - Assign subjects, auto-rotate through blocks, pause/resume/sync across tabs.  
2. **21-day habit board**  
   - Six habits, four daily hits = perfect day. Heat-map and streak counter.  
3. **Daily review**  
   - One-click rating, delta vs yesterday, 7-day and 21-day averages.  
4. **Data export**  
   - JSON or human-readable txt, habits + focus minutes + ratings.  

## Getting Started

```bash
# 1. Clone and install
git clone https://github.com/yourhandle//ProductivitySystemPersonalUse-.git
cd 
pnpm i

# 2. Env
cp .env.example .env
# Add PostgreSQL url, JWT secret, OpenAI key

# 3. Migrate & seed
npx prisma migrate deploy
npx prisma db seed

# 4. Run
cd frontend
pnpm run dev

cd server        # frontend on :3000
pnpm run deve # backend  on :4000
```

## Project Structure

```           – Shared Tailwind components
```

## Key Routes

- `/timer` – Pomodoro dashboard  
- `/habits` – 21-day board  
- `/stats` – Trends, deltas, AI insight  
- `/export` – Download data  

## Env Vars

```
DATABASE_URL=
JWT_SECRET=
OPENAI_API_KEY=
REDIS_URL=         (optional, for rate-limit)
```

## Scripts

- `npm run build` – Production build  
- `npm run lint` – ESLint + Prettier  
- `npm run test` – Jest suites  

## Deployment

Dockerfile included. Fly.io one-click:

```
fly launch
fly deploy
```

## Roadmap

- Mobile app block during focus blocks  
- GIF confetti packs for 2/4/6 habit completions  
- Notion-style database views for advanced users  

## License

MIT
