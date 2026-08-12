FROM node:26-slim

# make нужен, потому что команды приложения живут в Makefile.
RUN apt-get update && apt-get install -yq make \
  && rm -rf /var/lib/apt/lists/*

# corepack из образов Node 26 убран, поэтому pnpm ставится напрямую. Версия
# берётся из поля packageManager, чтобы образ и разработка совпадали.
RUN npm install -g pnpm@11.20.0

WORKDIR /app

# Зависимости ставятся до копирования кода, чтобы слой с ними переиспользовался
# и не пересобирался на каждую правку исходников.
# --ignore-scripts обязателен: скрипт prepare запускает сборку, а исходников на
# этом слое ещё нет, и установка падает на rollup.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm run build

CMD ["pnpm", "start"]
