import dotenv from 'dotenv';

dotenv.config();

export const webhookController = async (request, response) => {
    // Handle the webhook request here
    console.log('Received webhook payload:', request.body);

    // Respond to the webhook request
    response.status(200).send('Webhook received successfully');
}