setup: install-deps

install-deps:
	pnpm install --frozen-lockfile

start:
	heroku local -f Procfile.dev

start-backend:
	pnpm exec cross-env NODE_ENV=development nodemon bin/slack.js

start-frontend:
	pnpm exec vite
build:
	pnpm run build

test:
	pnpm run test

lint:
	pnpm run lint
	pnpm --silent run format:check

publish:
	pnpm publish --access public --no-git-checks

tag:
	git tag $(TAG) && git push --tags

deploy:
	git push heroku master

.PHONY: test

install:
	pnpm install
