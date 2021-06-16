setup: install-deps

install-deps:
	npm ci

start:
	heroku local -f Procfile.dev

start-backend:
	npx cross-env NODE_ENV=development nodemon bin/slack.js

start-frontend:
	npx webpack serve
build:
	npm run build

test:
	npm run test

lint:
	npm run lint

publish:
	npm publish --access public

tag:
	git tag $(TAG) && git push --tags

deploy:
	git push heroku master

.PHONY: test
