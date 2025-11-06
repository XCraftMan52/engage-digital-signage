# Use Node 22
FROM node:22

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN pnpm build

# Expose the default Next.js port
EXPOSE 3000

# Start the app in production mode
CMD ["pnpm", "start"]
