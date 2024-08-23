# Klaviyo-Shopify Customer Tagging

## Project Overview

This project integrates Klaviyo and Shopify to manage and tag customer data efficiently. The system is designed to handle both the migration of existing shareholders from Klaviyo to Shopify and the automated tagging of new customers added to a specific Klaviyo list.

### Features

- **Customer Migration:**
  - Fetches customer information from a specific Klaviyo list.
  - Locates these customers in Shopify.
  - Tags the customers in Shopify as "shareholders" to facilitate identification and segmentation.

- **Automated Tagging of New Customers:**
  - Utilizes Klaviyo flows to trigger actions when the specified list is updated.
  - Employs a webhook to capture updates in the list.
  - Adds these updates to a queue for efficient processing.
  - Automatically updates the customer tags in Shopify, ensuring that new shareholders are consistently tagged.

## Technologies Used

- **Node.js:** Core runtime environment for the application.
- **Express:** Handles server setup and API endpoints.
- **Klaviyo API:** Fetches customer data from Klaviyo.
- **Shopify API:** Updates customer data and tags in Shopify.
- **BullMQ:** Manages the processing queue to scale the system efficiently.
- **Axios:** Facilitates HTTP requests.
- **Nodemon:** Aids in development by automatically restarting the server on file changes.
- **Dotenv:** Manages environment variables.
