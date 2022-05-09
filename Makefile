static:
	pipenv run python src/manage.py collectstatic

migrate:
	pipenv run python src/manage.py migrate

run:
	pipenv run gunicorn --bind 0.0.0.0:8000 src.config.wsgi