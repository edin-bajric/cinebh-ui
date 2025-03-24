# The frontend of the Cinebh app

This frontend is a part of the Cinebh application, it contains the user interface and services which interact with the backend.

## Specifications
- React
- TypeScript
- Vite
- Node.js

### Libraries

#### UI & Styling
- `antd` - UI components library
- `classnames` - Utility for conditional class names
- `react-datepicker` - Date picker component
- `react-icons` - Icons library
- `react-spinners` - Loading spinners

#### State Management
- `@reduxjs/toolkit` - State management
- `react-redux` - Redux bindings for React

#### Forms & Validation
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Resolvers for form validation
- `yup` - Schema validation

#### HTTP Requests
- `axios` - HTTP client for API calls

#### Routing
- `react-router-dom` - Declarative routing for React

#### Date & Time
- `date-fns` - Date manipulation utilities

#### Payments
- `@stripe/react-stripe-js` - React bindings for Stripe
- `@stripe/stripe-js` - Stripe JavaScript library

#### Query & Fetching
- `react-query` - Server-state management

#### Development & Tooling
- `vite` - Build tool
- `typescript` - Typed JavaScript
- `eslint` - Linter for JavaScript and TypeScript
- `@vitejs/plugin-react` - React plugin for Vite
- `sass-embedded` - SCSS support

## Setup and running

```sh
git clone https://github.com/edin-bajric/cinebh-ui.git
cd cinebh-ui
npm install
npm run dev
```

## Deployment

### Prerequisites: Docker and Docker Compose

```sh
# Create a new folder and navigate into it
git clone https://github.com/edin-bajric/cinebh-ui.git
```

If the `docker-compose.yml` already exists from the backend repo, you can skip this part.

Create a new file called `docker-compose.yml` in the root folder and paste the following code:

```yaml
services:
  postgres:
    image: postgres:16.4
    environment:
      POSTGRES_DB:
      POSTGRES_USER:
      POSTGRES_PASSWORD:
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - default

  backend:
    build:
      context: ./cinebh
    environment:
      DB_URL:
      DB_USERNAME:
      DB_PASSWORD:
      MG_DOMAIN:
      MG_FROM_EMAIL:
      MG_PASSWORD:
      JWT_SECRET:
    depends_on:
      - postgres
    ports:
      - "8080:8080"

  frontend:
    build:
      context: ./cinebh-ui
    container_name: cinebh-frontend-1
    depends_on:
      - backend
    ports:
      - "80:80"

volumes:
  postgres_data:
```

Fill in the environment variables in the `docker-compose.yml` file, then run:

```sh
docker-compose up --build
```

The frontend will be running on `http://localhost`. 🚀
