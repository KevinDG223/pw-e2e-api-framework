import { test as base } from '@playwright/test'
import { RequestHandler } from './request-handler'
import { ProductApi } from '../API/product.api'
import { AuthApi } from '../API/auth.api'
import { CartApi } from '../API/cart.api'

export type TestOptions = {
    api: RequestHandler,
    productApi: ProductApi,
    authApi: AuthApi
    cartApi: CartApi
}

export const test = base.extend<TestOptions>({
    api: async ({ request }, use) => {
        const baseUrl = 'https://fakestoreapi.com'
        const requestHandler = new RequestHandler(request, baseUrl)
        await use(requestHandler)
    },

    productApi: async ({ api }, use) => {
        const productApi = new ProductApi(api)
        await use(productApi)
    },

    authApi: async ({ api }, use) => {
        await use(new AuthApi(api))
    },

    cartApi: async ({ api }, use) => {
        await use(new CartApi(api))
    }
})