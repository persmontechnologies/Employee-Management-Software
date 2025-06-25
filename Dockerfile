# Backend Dockerfile
FROM node:18-alpine AS backend-builder

WORKDIR /app
COPY packages/backend/package*.json ./
COPY packages/shared ./packages/shared
RUN npm install

COPY packages/backend ./
RUN npx prisma generate
RUN npm run build

# Frontend Dockerfile
FROM node:18-alpine AS frontend-builder

WORKDIR /app
COPY packages/frontend/package*.json ./
COPY packages/shared ./packages/shared
RUN npm install

COPY packages/frontend ./
RUN npm run build

# Production Backend
FROM node:18-alpine AS backend-production

WORKDIR /app
COPY --from=backend-builder /app/dist ./dist
COPY --from=backend-builder /app/node_modules ./node_modules
COPY --from=backend-builder /app/prisma ./prisma
COPY --from=backend-builder /app/package*.json ./

EXPOSE 3001
CMD ["npm", "run", "start:prod"]

# Production Frontend (Nginx)
FROM nginx:alpine AS frontend-production

COPY --from=frontend-builder /app/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
