# Stage 1: Build Frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Express Server + DB + Static Serving
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80
ENV DATA_DIR=/data
ENV UPLOADS_DIR=/uploads

# Create volume directories
RUN mkdir -p /data /uploads

COPY package*.json ./
RUN npm install --only=production

# Copy build files & server
COPY --from=builder /app/dist ./dist
COPY server.js ./
COPY src/data/flavors.js ./src/data/flavors.js

VOLUME ["/data", "/uploads"]

EXPOSE 80

CMD ["node", "server.js"]
