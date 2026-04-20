# backend/Dockerfile
FROM python:3.11-slim

# System dependencies for jq and other packages
RUN apt-get update && apt-get install -y \
    libjq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
