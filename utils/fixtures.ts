import { test as base, Route } from '@playwright/test'
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
    api: async ({ request, baseURL }, use) => {
        const finalUrl = baseURL || 'https://fakestoreapi.com'

        if (process.env.CI) {
            console.log('CI Environment: Enabling Network Interception (Mocks)');

            // Interceptamos TODAS las llamadas que empiecen por la URL de la API
            await (request as any).context().route('**/auth/login', async (route: Route) => {
                await route.fulfill({
                    status: 201,
                    contentType: 'application/json',
                    body: JSON.stringify({ token: 'fake-jwt-token-for-ci' })
                });
            });

            await (request as any).context().route('**/carts**', async (route: Route) => {
                await route.fulfill({
                    status: 201,
                    contentType: 'application/json',
                    body: JSON.stringify({ id: 1, userId: 1, date: "2020-03-02", products: [{ productId: 1, quantity: 4 }] })
                });
            });

            await (request as any).context().route('**/products**', async (route: Route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify([{ id: 1, title: 'Mock Product CI', price: 10, category: 'test' }])
                });
            });
        }

        const requestHandler = new RequestHandler(request, finalUrl)
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