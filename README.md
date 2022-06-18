# gateway-manager-backend

This sample project is managing gateways - master devices that control multiple peripheral
devices. 

## Expectations
1. create a REST service (JSON/HTTP) for storing information about these
gateways and their associated devices.
2. The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway.
3. The service must offer an operation to add and remove peripheral device.
4. When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid


## Stacks used
1. Node Js and Express - Robust routing and server-side implementation.
2. MongoDb - Used for the databsase.
3. Jest - Carrying out unit testing.
4. Github action and Heroku for CI/CD.

### URLS AND API

Hosted Backend_url: https://gateway-device.herokuapp.com/api/

GithUrl: https://github.com/Akius1/gateway-manager-backend/tree/main,

Postman Collection URL: https://documenter.getpostman.com/view/12925033/UzBmLSXm


### Getting Started:

1. Clone repository : https://github.com/Akius1/gateway-manager-backend.git
2. Install depencies : npm install
3. Start the application : npm run start
4. Or simply visit the Frontend URl: https://mu-gateway.herokuapp.com/

### Additional Features
1. CI/CD
2. Unit tested all endpoints


