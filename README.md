# task-list-backend-laminas

## Step by step to start the application

**Installation using Composer**

docker-compose up -d --build


**Install dependencies**

docker-compose exec api-laminas composer install


**Create database**

docker-compose exec mysql mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS taskdb_leonardo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"


**Run the migrations**

docker-compose exec api-laminas php vendor/bin/phinx migrate


**Run the tests**

docker-compose exec api-laminas ./vendor/bin/phpunit


**Authentication**

The application simulates a user login. To access from the login screen, use **username = user and password = 1234**

**Views**

The API runs on port 8081. To access it, use http://localhost:8081

http://localhost:8082/

http://localhost:8082/login

http://localhost:8082/tasks

http://localhost:8082/task/:id

http://localhost:8082/task/:id/status/
