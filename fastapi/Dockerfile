FROM python:3.9.0
USER root

RUN mkdir fastapi

WORKDIR /root/fastapi/

RUN apt-get update
COPY . .

RUN apt-get install -y vim less
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
