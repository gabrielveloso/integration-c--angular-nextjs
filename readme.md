# Integration Project

This project contains 4 applications working together: a .NET backend and three frontends (Next.js and two Angular).

## Objective

Develop an application composed of:

- Backend in C# .NET
- Frontend in Next.js
- Two frontends in Angular

The goal is to demonstrate proficiency in integrating multiple frameworks, managing authentication with sessions, and enabling navigation between different applications.

You can use **hard-coded authentication and OTP values** for simplicity. The objective is to show the flow and communication between the apps via session cookies, not to implement full production-grade authentication.

---

## Project Structure

```
integration/
├── backend/                    # .NET 8 API
├── frontend-nextjs/           # Next.js Frontend
├── front-angular-admin/       # Angular Admin Frontend
└── front-angular-user/        # Angular User Frontend
```

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (version 20 or higher)
- npm or yarn

### Hosts File Configuration

Edit your hosts file (`/etc/hosts` on Linux/Mac or `C:\Windows\System32\drivers\etc\hosts` on Windows) to map development domains to 127.0.0.1:

```
127.0.0.1  backend.test api.test
127.0.0.1  app.test       (Next.js)
127.0.0.1  user.test      (Angular user)
127.0.0.1  admin.test     (Angular admin)
```

**Note**: The Angular applications are configured to run on these custom domains.

## How to Run Projects Locally

### 1. Backend (.NET API)

**First-time setup**: To run the backend with HTTPS, you need to trust the development certificates:

```powershell
dotnet dev-certs https --trust
```

Then run the backend:

```powershell
cd backend
dotnet restore
dotnet run
```

The backend will be available at:

- **HTTPS**: https://api.test:7186
- **HTTP**: https://api.test:5186
- **Swagger**: https://api.test:7186/swagger

### 2. Next.js Frontend

```powershell
cd frontend-nextjs
npm install
npm run dev
```

The Next.js frontend will be available on the port configured in `server.js`.

- **URL**: https://app.test:3000

#### Data needed in the nexjs app

Phone: 96479285
OTP: 123456

### 3. Angular Admin Frontend

```powershell
cd front-angular-admin
npm install
npm start
```

The Angular Admin frontend will be available at:

- **URL**: http://admin.test:4200

#### Data needed in the nexjs app

Email: admin@gmail.com
password: 123456

### 4. Angular User Frontend

```powershell
cd front-angular-user
npm install
npm start
```

The Angular User frontend will be available at:

- **URL**: http://user.test:4201

## Running All Projects

To run all projects simultaneously, open 4 different terminals and execute each command in its respective directory:

**Terminal 1 - Backend:**

```powershell
cd backend; dotnet run
```

**Terminal 2 - Next.js:**

```powershell
cd frontend-nextjs; npm run dev
```

**Terminal 3 - Angular Admin:**

```powershell
cd front-angular-admin; npm start
```

**Terminal 4 - Angular User:**

```powershell
cd front-angular-user; npm start
```

## Technologies Used

- **Backend**: .NET 8, ASP.NET Core Web API, Swagger
- **Next.js Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Angular Frontends**: Angular 20, TypeScript, RxJS, SSR
