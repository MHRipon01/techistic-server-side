# Techistic - Online Shopping Platform

## https://techistic-server.vercel.app/

Techistic is an online shopping platform built on Node.js, Express, and MongoDB that provides users with a seamless shopping experience. It includes product management, cart functionality, and user-specific product views.

## Features

- **Product Management:** Add, view, update, and delete products from the inventory.
- **User-Centric Cart:** Manage user-specific carted products and provide tailored shopping experiences.
- **Category Filter:** Filter products by brand or category for an optimized browsing experience.
- **Secure Authentication:** Utilizes MongoDB for user authentication and session management.
  
## Tech Stack

- **Backend Framework:** Node.js with Express
- **Database:** MongoDB for data storage
- **API Testing:** Postman for endpoint testing
- **External Services:** Integrates with Stripe for payment processing

## Getting Started

1. Clone this repository.
2. Set up environment variables by creating a `.env` file and defining `DB_USER`, `DB_PASS`, and other required variables.
3. Install dependencies using `npm install`.
4. Start the server with `npm start`.
5. Access the application via `http://localhost:5000`.

## Endpoints

- **GET** `/product`: Retrieve all products.
- **GET** `/product/:brand`: Get products by brand/category.
- **GET** `/productDetails/:id`: Get product details by ID.
- **POST** `/product`: Add a new product.
- **PUT** `/update/:id`: Update a product.
- **GET** `/update/:id`: Get details to update a product.
- **GET** `/cartedProduct/:email`: Get carted products by user email.
- **POST** `/cart`: Add products to the cart.
- **GET** `/cartedProduct`: Get all carted products.
- **DELETE** `/cartedProduct/:id`: Remove a product from the cart by ID.

## Contributors

- [Your Name](https://github.com/yourusername)
- [Contributor Name](https://github.com/contributorusername)

## License

This project is licensed under the [MIT License](LICENSE).
