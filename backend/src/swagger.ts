import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

// Swagger config options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Campus Cart',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
    },
    apis: ['src/routes/*.ts', 'src/routes/*.js'], // Path to your route files with Swagger comments
};

// Generate Swagger spec
export const swaggerSpec = swaggerJsdoc(options);
