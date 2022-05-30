up:
	docker-compose up -d

build:
	docker-compose build

down:
	docker-compose down

build:
	docker-compose build

test:
	echo "test"

restart:
	docker-compose rm -sf api
	docker-compose rm -sf web
	make up
