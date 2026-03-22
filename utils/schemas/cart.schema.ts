export const CartSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
        date: {
            type: 'string',
            format: 'date'
        },
        products: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    productId: { type: 'number' },
                    quantity: { type: 'number' }
                },
                required: ['productId', 'quantity']
            }
        }
    },
    required: ['id', 'userId', 'date', 'products'],
    additionalProperties: false
}

export const CartListSchema = {
    type: 'array',
    items: CartSchema
}