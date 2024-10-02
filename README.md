# Plex Rewind

[![Plex Rewind release status](https://img.shields.io/github/actions/workflow/status/RaunoT/plex-rewind/release.yml?label=Release)](https://github.com/RaunoT/plex-rewind/actions/workflows/release.yml)
[<img src="https://img.shields.io/github/v/release/raunot/plex-rewind?label=latest" alt="Plex Rewind latest release">](https://github.com/RaunoT/plex-rewind/releases)
[![Plex Rewind pre-release status](https://img.shields.io/github/actions/workflow/status/RaunoT/plex-rewind/pre-release.yml?include_prereleases=true&label=Pre-release)](https://github.com/RaunoT/plex-rewind/actions/workflows/pre-release.yml)
[<img src="https://img.shields.io/github/v/release/RaunoT/plex-rewind?include_prereleases&label=develop" alt="Plex Rewind develop release">](https://github.com/RaunoT/plex-rewind/releases)

A Plex Rewind application inspired by the likes of [Spotify Wrapped](https://www.spotify.com/us/wrapped) and [Tautulli](https://tautulli.com).

Present [Plex](https://plex.tv) user statistics and habits in a beautiful and organized manner - as a web application application using data from [Tautulli](https://tautulli.com), [Overseerr](https://overseerr.dev) and [Plex](https://plex.tv). Includes an intelligent AI assistant to get quick answers about anything going on in your Plex library!

## Features

- 🤖 AI assistant - using a chat interface, you can ask questions about your Plex library, viewing history, and get recommendations using [GPT-4o-mini](https://platform.openai.com/docs/models/gpt-4o).
- 📱 Fully responsive - viewable, usable & enjoyable on desktop, tablet or mobile, courtesy of [Tailwind.css](https://tailwindcss.com).
- 🔄 Fully dynamic - the data you're viewing will always be the latest available.
- 📆 Rewind - allows your Plex users view their statistics and habits for a chosen time period.
- 👀 Dashboard - provides an easily glanceable overview of activity on your server for all your libraries, personalized or general.
- 📊 Fuelled by data from [Tautulli](https://tautulli.com) - the backbone responsible for the heavy lifting regarding statistics.
- 🔗 Integrates with [Overseerr](https://overseerr.dev) - show request breakdowns and totals and display request buttons straight under deleted fan-favorite media items.
- 🔐 Log in with Plex - uses [NextAuth.js](https://next-auth.js.org) to enable secure login and session management with your Plex account.
- 🚀 PWA support - installable on mobile devices and desktops thanks to [Serwist](https://github.com/serwist/serwist).
- 🐳 Easy deployment - run the application in a containerized environment with [Docker](https://www.docker.com).
- ✨ Beautiful animations with [Framer Motion](https://www.framer.com/motion).
- ⭐ All of this and more - powered by [Next.js](https://nextjs.org).

Keep an eye on the [issues page](https://github.com/RaunoT/plex-rewind/issues) to see what new features have already been requested or to make your own request!

## Preview

![Dashboard](https://i.imgur.com/6UKEp7v.png 'Dashboard')

![Rewind](https://i.imgur.com/w536oB5.png 'Rewind')

## Getting started

1. Create a `docker-compose.yml` in your location of choice and run `docker compose up -d`. The app will be available at `http://localhost:8383`.

```yml
services:
  plex-rewind:
    image: ghcr.io/raunot/plex-rewind:latest # :develop for the latest development version
    container_name: plex-rewind
    environment:
      - NEXTAUTH_SECRET= # (required) used to encrypt auth JWT token, generate one with `openssl rand -base64 32`
      - NEXTAUTH_URL=http://localhost:8383 # (required) change to your domain if you are exposing the app to the internet
      - NEXT_PUBLIC_SITE_URL=http://localhost:8383 # (required) change to your domain if you are exposing the app to the internet
    volumes:
      - ./config:/app/config
    ports:
      - 8383:8383
    restart: unless-stopped
```

> _NOTE: If you run into authentication issues, try setting `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your external Docker IP, instead of localhost. For example `http://192.168.1.1:8383`._

For those that need it, a simple status page is also available at `/api/status`.

### Unraid

Plex Rewind is also available in the Community Apps store for Unraid. Search for "Plex Rewind" and install it from grtgbln's repository.

### AI Assistant

Built with [Vercel AI SDK](https://sdk.vercel.ai) using [GPT-4o-mini](https://platform.openai.com/docs/models/gpt-4o), the most efficient and cost effective model by OpenAI at the time of writing.

You will need to set up your own [OpenAI API key](https://platform.openai.com/docs/guides/production-best-practices/api-keys) to use the AI assistant. Once you have your API key you can add it under Connection settings and a new chat icon will appear in the top right corner of the page.

Here are some parameters in place to try and keep costs down:

- **Output tokens:** limited to 1024 per request to keep costs down.
- **Input tokens:** 128,000 per request - the maximum allowed by OpenAI. This is required for long histories. In case the history is still too long, it will automatically be trimmed.
- **Temperature:** 0.5 - a balance between "creative" and "precise" answers.
- **Caching** - The history of your library (max 128,000 tokens) is cached to `config/ai-context.txt`. This file is updated only once per hour to reduce excessive writing of large files and speed up the response time. If you want to clear the cache, delete the `ai-context.txt` file and make a new request.

Pricing can be found on [OpenAI's pricing page](https://openai.com/api/pricing).

## Updating

To update, run `docker compose pull` and then `docker compose up -d`.

## Donate

If you like this project and wish to support it, you can do so by donating via [Patreon](https://www.patreon.com/PlexRewind) or [PayPal](https://paypal.me/raunot). Thank you! ❤️

## Learn More

To learn more about some of the tools used in this project, take a look at the following resources:

- [Tautulli API reference](https://docs.tautulli.com/extending-tautulli/api-reference)
- [Overseerr API reference](https://api-docs.overseerr.dev)
- [OpenAI API reference](https://platform.openai.com/docs/overview)
- [Next.js docs](https://nextjs.org/docs)
- [NextAuth.js docs](https://next-auth.js.org/getting-started/introduction)
- [Vercel AI SDK docs](https://sdk.vercel.ai/docs/introduction)
