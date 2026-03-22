import { test } from '../../utils/fixtures'
import { expect } from '@playwright/test'

test.describe('Get /Products', () => {
    //Agregar Create product, update, delete

    test('Get All Products', async ({ productApi }) => {
        const response = await productApi.getAll()
        expect(response.length).toEqual(20)

    })

    test('Get Products limited by query param', async ({ productApi }) => {
        const response = await productApi.getWithLimit(10)
        expect(response.length).toEqual(10)
    })

    test('Get Product by valid ID', async ({ productApi }) => {
        const productId = 1
        const response = await productApi.getById(productId)
        expect(response).toMatchObject({
            id: productId,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        })
    })

    test('Get Product by invalid ID', async ({ api }) => {
        const productId = 25
        const response = await api
            .path(`/products/${productId}`)
            .getRequest(200)
        expect(response).toBeNull()
    })
})