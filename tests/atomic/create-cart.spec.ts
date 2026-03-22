import { test } from '../../utils/fixtures'
import { expect } from '@playwright/test'

test.describe('Cart Management - Create Cart', () => {
    const userId = 1
    const defaultProducts = [
        {productId: 1, quantity: 3}, 
        {productId: 2, quantity: 1 }
    ]

    test('New Cart for a Valid User', async({cartApi}) => {
        const response = await cartApi.createCart(userId, defaultProducts)

        expect(response).toHaveProperty('id')
        expect(response.userId).toBe(userId)
        expect(response.products).toHaveLength(2)
        expect(response.products[0]).toMatchObject({
            productId: 1,
            quantity: 3
        })
    })
    
    test('Create an Empty Cart', async({cartApi}) => {
        const emptyProducts: any[] = []
        const response = await cartApi.createCart(userId, emptyProducts)

        expect(response.products).toHaveLength(0)
    })
})