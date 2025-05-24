FROM python:3.11-bullseye

WORKDIR /app

# Install dependencies for GDAL and PostGIS
RUN apt-get update && apt-get install -y \
    gdal-bin \
    libgdal-dev \
    libproj-dev \
    binutils \
    gcc \
    python3-dev \
    postgresql-client \
    nodejs npm \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set environment variables for GDAL
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal
ENV GDAL_LIBRARY_PATH=/usr/lib/libgdal.so

# Install OS deps
RUN apt-get update && apt-get install -y build-essential curl

# Install Node.js (for React build)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Copy requirements and install
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --root-user-action=ignore -r requirements.txt

# Copy project files
COPY . .

# Default command to run the app: can be overridden by Render or locally
CMD bash start.sh
