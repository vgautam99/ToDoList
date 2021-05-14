FROM python:3.6

COPY requirements.txt ./app/todolist/
WORKDIR /app/todolist/

RUN pip install -r requirements.txt

COPY . /app/todolist/

EXPOSE 8000