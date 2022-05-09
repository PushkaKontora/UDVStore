FROM python:3.10-slim-buster
ENV PYTHONUNBUFFERED=1

WORKDIR /api

COPY Pipfile.lock .
RUN apt-get update && \
    apt-get install make && \
    pip install pipenv && \
    pipenv install --deploy --ignore-pipfile --clear

EXPOSE 8000

COPY . .
