# Agaya

A full stack web application

## Installation

## 1. Clone this project

```bash
git clone https://github.com/Pachara2103/Agaya.git
```

## 2. Set up environment

### Create a new .env in the frontend

```bash
VITE_APP_URL=http://localhost:5000/api/v1/agaya
```

### Create a new .env in the backend

```bash
PORT = 5000
NODE_ENV = development
MONGO_URI = <YOUR_MONGO_URI>
JWT_SECRET = <YOUR_JWT_SECRET>
JWT_EXPIRE = <YOUR_JWT_EXPIRE>
JWT_COOKIE_EXPIRE = <YOUR_JWT_COOKIE_EXPIRE>
GOOGLE_CLIENT_ID = <YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET = <YOUR_GOOGLE_CLIENT_SECRET>
GOOGLE_CALLBACK_URL = http://localhost:5000/api/v1/Agaya/auth/google/callback
EMAIL_USER = <YOUR_EMAIL_USER>
EMAIL_PASSWORD = <YOUR_EMAIL_PASSWORD>
CLOUDINARY_CLOUD_NAME = <YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY = <YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET = <YOUR_CLOUDINARY_API_SECRET>
STRIPE_SECRET_KEY = <YOUR_STRIPE_SECRET_KEY>
FRONTEND_URL = http://localhost:5173
```
you can set your own frontend and backend port
<br>you have to set up your cloudinary for getting CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET</br>

## 3. Installation & run

### run on localhost

```bash
  cd frontend
  npm install
  npm run dev
```

```bash
  cd backend
  npm install
  npm run dev
```


### run on docker using docker-compose

```bash
  docker compose up --build
```

The client will be running on http://localhost:5173
 <br>The server will be running on http://localhost:5000</br>

in docker-compose.yml you can set your own user and password for database

```bash
MONGO_URI=mongodb://<YOUR-USER-NAME>:<YOUR-PASSWORD>@mongodb:27017/<YOUR-DATABASE-NAME>?authSource=admin
MONGO_INITDB_ROOT_USERNAME: <YOUR-USER-NAME>
MONGO_INITDB_ROOT_PASSWORD: <YOUR-PASSWORD>
```
