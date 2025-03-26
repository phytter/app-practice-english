FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

COPY package.json package-lock.json ./
COPY .next ./.next
COPY public ./public
COPY node_modules ./node_modules

ENV SWC_BINARY_PATH=/app/node_modules/@next/swc-linux-x64-gnu

EXPOSE 3000
CMD ["npm", "start"]
