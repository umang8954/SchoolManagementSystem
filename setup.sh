#!/bin/bash

# School Management System - Setup Script
# This script helps you get started quickly

echo "================================================"
echo "  School Management System - Quick Setup"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
print_status "Checking Docker installation..."
if ! command -v docker &> /dev/null
then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi
print_success "Docker is installed"

# Check if Docker Compose is installed
print_status "Checking Docker Compose installation..."
if ! command -v docker-compose &> /dev/null
then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi
print_success "Docker Compose is installed"

# Check if Maven is installed
print_status "Checking Maven installation..."
if ! command -v mvn &> /dev/null
then
    print_error "Maven is not installed. Please install Maven first."
    exit 1
fi
print_success "Maven is installed"

# Check if Java is installed
print_status "Checking Java installation..."
if ! command -v java &> /dev/null
then
    print_error "Java is not installed. Please install Java 17 or higher first."
    exit 1
fi
JAVA_VERSION=$(java -version 2>&1 | head -1)
print_success "Java is installed: $JAVA_VERSION"

echo ""
print_status "Starting Docker containers..."
docker-compose up -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 10

# Check if services are running
if [ "$(docker-compose ps | grep -c 'Up')" -ge 3 ]; then
    print_success "All services are running!"
else
    print_error "Some services failed to start"
    docker-compose logs
    exit 1
fi

echo ""
print_status "Building project..."
mvn clean install -DskipTests

if [ $? -eq 0 ]; then
    print_success "Build successful!"
else
    print_error "Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "================================================"
echo -e "${GREEN}  Setup Complete!${NC}"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Run the application:"
echo "   ${BLUE}mvn spring-boot:run${NC}"
echo ""
echo "2. Open in browser:"
echo "   ${BLUE}http://localhost:8080/swagger-ui.html${NC}"
echo ""
echo "3. Test the APIs using Swagger UI"
echo ""
echo "4. Read more in:"
echo "   ${BLUE}QUICK_START.md${NC}"
echo ""
