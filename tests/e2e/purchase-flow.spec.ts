import { test } from '../../utils/fixtures'
import { expect } from '@playwright/test'

test.describe('Purchase Flow E2E', () => {
    test('Complete E2E Flow', async ({ authApi, productApi, cartApi }) => {
        const loginResponse = await authApi.login({
            username: 'mor_2314',
            password: '83r5^_'
        })
        expect(loginResponse).toHaveProperty('token')

        const products = await productApi.getAll()
        const selectedProduct = products[0]
        expect(selectedProduct).toHaveProperty('id')

        const newCart = await cartApi.createCart(1, [
            { productId: selectedProduct.id, quantity: 2 }
        ])

        expect(newCart).toHaveProperty('id')
        expect(newCart.products[0].productId).toBe(selectedProduct.id)
        console.log(`Successfully created cart ID: ${newCart.id} for Product: ${selectedProduct.title}`)
    })
})