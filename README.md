# yoga class registration

## 🔗 Hosting
# Backend is hosted on render.
[![Backend](https://img.shields.io/badge/Backend-deployed-brightgreen?style=for-the-badge&logo=appveyor)](https://yoga-server-2ew8.onrender.com/)
# Frontend is hosted on render.
[![Frontend](https://img.shields.io/badge/Frontend-deployed-blueviolet?style=for-the-badge&logo=appveyor)](https://yoga-client-e1u4.onrender.com/)


## Run Locally

Clone the client

```bash
  git clone https://github.com/shivam-kumar123/yoga-client.git
```

Go to the Client directory

```bash
  cd yoga-client
```

Install Client dependencies

```bash
  npm install
```

Configure environment variable after creating .env file in root directory of yoga-client folder

```bash
  .env
```

Start the Client server 

```bash
  npm start
```

Client is live on 

```bash
  http://localhost:3000
```



## Tech Stack

**Client:** React,Typescript

**Server:** Node.js, Express.js

**Database** MongoDB




## System Architecture
![yoga-architecture](https://github.com/shivam-kumar123/yoga-client/assets/75497119/feeebd72-62e3-4f24-9909-7654c364dbf6)



## Future Scope

- Nginx can be used as reverse Proxy as each client and server are a microservice
- Consisent hashing can be implemented on Nginx server for effective load balancing if multiple server instance are present 
- database sharding can be done for making resilient system
- master slave architecture can be adopted for database for database failover prevention
- If there are multiple form submissions lets say on a very large scale our databse has less throughtput and it might go down, for such cases we need a message queue like kafka or RabbitMQ which has a very high throughput, message queue can also be used in the mailing system if server overloads.

## Check it out
[![Frontend](https://img.shields.io/badge/Project-deployed-blue?style=for-the-badge&logo=appveyor)](https://yoga-client-e1u4.onrender.com/)