# Notification Service Project

## Overview

This project consists of six microservices  and a shared folder but two other microservices are mostly important to communicate with the Notification service: `user-management`, and `user-wallet`. These services communicate using RabbitMQ for message passing. The `notification-service` runs a cron job to check if users have sufficient funds in their wallets and sends notifications accordingly. The services are built with Node.js, TypeScript, and Express. Dummy data are used for communications

## Design Pattern

The project follows Domain Driven Design and microservices architecture where each service is responsible for a specific business capability. Communication between services is done asynchronously using RabbitMQ. This decouples the services and makes the system more resilient and scalable.

### Key Design Patterns

1. **Microservices Architecture**: Independent services communicate via messaging.
2. **Publisher-Subscriber**: Services publish and subscribe to messages in RabbitMQ queues.
3. **Cron Jobs**: Periodic tasks are scheduled using `node-cron`.

## Technology Stack

- **Node.js**: JavaScript runtime for building the services.
- **TypeScript**: Type safety and modern JavaScript features.
- **Express**: Web framework for building the REST APIs.
- **RabbitMQ**: Message broker for asynchronous communication.
- **cron**: Library for scheduling tasks.
- **amqplib**: Node.js library for RabbitMQ.
- **Nodemailer**: Node.js library for email transport.
- **Twilio**: Third-party API for mobile notification transport.

## Services

### Notification Service

Responsible for sending notifications to users who do not have sufficient funds.

### User Management Service

Manages user data and provides services to retrieve user information.

### User Wallet Service

Handles wallet operations and checks if users have sufficient funds.

## Setup Instructions

### Prerequisites

- Node.js (>= 14.x)
- Yarn
- RabbitMQ

### Installation

1. **Clone the repository**:
    ```bash
    git clone <https://github.com/auntyemman/deposit-notification>
    cd <repository-directory>
    ```

2. **Install dependencies**:
    ```bash
    yarn install
    ```

3. **Environment Configuration**:
   - Create a `.env` file in the root of each service (`notification-service`, `user-management`, `user-wallet`) and add necessary environment variables.
   - Example for `.env`:
     ```
     PORT=
     RABBITMQ_URL=
     PORT=2024
     USER_PORT=
     WALLET_PORT=
     EMAIL_USER=
     EMAIL_PASSWORD=
     TWILIO_ACCOUNT_SID=
    TWILIO_TOKEN=
    TWILIO_PHONE_NUMBER=

     ```

### Running the Services

1. **Run RabbitMQ**:
   Ensure RabbitMQ is running on your local machine or accessible via the URL specified in the `.env` file.

2. **Start Services**:
    - Use `concurrently` to start all services in development mode:
      ```bash
      yarn dev
      ```

    - Alternatively, you can start each service individually:
      ```bash
      yarn dev:notification
      yarn dev:user-management
      yarn dev:user-wallet
      ```

### Testing the Functionality

1. **Notification Service**:
   - The service runs a cron job every minute to check user balances and send notifications.
   - Check the logs to verify if the cron job is executing and processing messages correctly.

2. **User Management Service**:
   - Provides service to manage users.
   - Ensure it's listening for messages to fetch user data.

3. **User Wallet Service**:
   - Provides service to check wallet balances.
   - Ensure it's listening for messages to check user funds.

### Error handling
A custom error file was created in the shared folder and an error handler middleware was used across the services

### Additional Features and Improvements
1. Implementing the Rabbitmq with correlationId instead of sending and waiting to recieve response.
2. Authentication and Authorization to make request and communication secure.
3. Persist the user data in Postgres or Mongodb database for close control.