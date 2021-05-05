setup: install-deps

install-deps:
	npm ci

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon bin/slack.js

start-frontend:
	npx webpack serve

build:
	npm run build

test:
	npm run test

lint:
	npm run lint

.PHONY: test
