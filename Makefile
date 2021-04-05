setup: install-deps

install-deps:
	npm ci

start:
	npm run start

test:
	npm run test

lint:
	npm run lint

lint-fix:
	npm run lint-fix

.PHONY: test
