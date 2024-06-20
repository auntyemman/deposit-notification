#!/bin/bash

services=("user-management" "user-dashboard" "payment-gateway" "user-wallet" "notification")

for service in "${services[@]}"; do
  mkdir -p $service/src/{common,dto,entities,repositories,services,controllers,routes}
  touch $service/src/server.ts
done
