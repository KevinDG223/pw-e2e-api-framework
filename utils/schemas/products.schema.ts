export const ProductSchema = {
    type: 'object',
    properties: {
        id: {type: 'number' },
        title: { type: 'string' },
        price: { type: 'number' },
        description: {type: 'string'},
        category: {type: 'string'},
        image: {type: 'string'},
        rating: {
            type: 'object',
            properties: {
                rate: {type: 'number'},
                count: {type: 'number'}
            },
            required: ['rate', 'count']
        }
    },
    required: ['id', 'title', 'price', 'category']
}

export const ProductListSchema = {
    type: 'array',
    items: ProductSchema
}