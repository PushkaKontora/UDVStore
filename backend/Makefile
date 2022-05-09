command:
	pipenv run python src/manage.py ${c}

run:
	make command c="runserver"

migrate:
	make command c="migrate ${o}"

migration:
	make command c="makemigrations ${o}"

user:
	make command c="createsuperuser"

lint:
	pipenv run isort . & \
	pipenv run flake8 --config setup.cfg & \
	pipenv run black --config pyproject.toml .

check_lint:
	pipenv run isort --check --diff . & \
	pipenv run flake8 --config setup.cfg & \
	pipenv run black --check --config pyproject.toml .

up:
	pipenv run gunicorn --bind 0.0.0.0:8000 src.config.wsgi

static:
	pipenv run make command c="collectstatic"
