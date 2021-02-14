<h1 align="center">pomodoro</h1>

<div align="center">
  <a href="https://mbenecki-pomodoro.herokuapp.com/">
    <img src="https://github.com/beneckimateusz/pomodoro/blob/main/img/logo.png?raw=true" />
  </a>
</div>

<div align="center">
  <strong>Pomodoro technique helper</strong>
</div>

<div align="center">
  Manage your <code>time</code> properly with a simple web application
</div>

<br />

<div align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/beneckimateusz/pomodoro.svg?style=flat-square" />
  <img alt="Code style" src="https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square" />
</div>

<div align="center">
  <sub>Built with ☕ by <a href="https://mbenecki.com/">Mateusz Benecki</a></sub>
</div>

<br />

<div align="center">
  <img src="https://github.com/beneckimateusz/pomodoro/blob/main/img/countdown.gif?raw=true" />
</div>

<br />

## Table of contents

- [Tech stack](#tech-stack)
- [Features](#features)
- [Presentation](#presentation)
- [Development](#development)

## Tech stack

- **Frontend** - React.js, MaterialUI, Apollo Client, Recharts
- **Backend** - Node.js, Express.js, GraphQL, Apollo Server
- **Database** - MongoDB, Mongoose

## Features

- 🖥️ **Dark theme:** to reduce eyestrain
- ⏰ **Browser notifications + alert sound**: notice end of interval when using another app
- ⏳ **Interval durations adjustment**: whatever works for you
- 📊 **Statistics**: total and average - for logged-in users
- ⌨️ **Keyboard shortcuts**: forget about moving your mouse around
- ( ͡° ͜ʖ ͡°) **Overall decent**

Currently the app supports mostly desktop display resolutions.

## Presentation

|                                                 Settings Dialog and Dark theme                                                  |                                                        Sign Up                                                        |                                                        Sign In                                                        |                                                            Notification                                                             |
| :-----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/beneckimateusz/pomodoro/blob/main/img/settings.gif?raw=true" title="Settings Dialog" width="100%"> | <img src="https://github.com/beneckimateusz/pomodoro/blob/main/img/signup.gif?raw=true" title="Sign Up" width="100%"> | <img src="https://github.com/beneckimateusz/pomodoro/blob/main/img/signin.gif?raw=true" title="Sign In" width="100%"> | <img src="https://github.com/beneckimateusz/pomodoro/blob/main/img/end_of_pomodoro.gif?raw=true" title="Notification" width="100%"> |

### Statistics

#### Last `x` days

![Last 31 days](https://github.com/beneckimateusz/pomodoro/blob/main/img/period_chart.gif?raw=true)

#### This year

![This year](https://github.com/beneckimateusz/pomodoro/blob/main/img/year_chart.gif?raw=true)

#### Today

![Today](https://github.com/beneckimateusz/pomodoro/blob/main/img/today_chart.gif?raw=true)

## Development

Requirements for both client and server are listed in _Tech stack_ section.

### Server

```sh
# Clone environment variables template
cp .env.template .env
# Fill out envs
vim .env
# Install dependencies
npm i
# Run the development server
npm run dev
```

Now you can visit `localhost:{port_from_dotenv}/api` from your browser for an interactive GraphQL playground.

### Client

```sh
# Change proxy port so it matches with the backend
vim package.json
# Install dependencies
npm i
# Run the development server
npm start
```

Now you can visit [`localhost:3000`](localhost:3000) from your browser.
