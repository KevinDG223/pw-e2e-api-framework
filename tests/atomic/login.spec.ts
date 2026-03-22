import { AuthApi } from '../../API/auth.api'
import { test } from '../../utils/fixtures'
import { expect } from '@playwright/test'

test.describe('Authentication', () => {
    test('Login with Valid Credentials', async ({ authApi }) => {
        const credentials = { username: 'mor_2314', password: '83r5^_' }
        const response = await authApi.login(credentials)

        expect(response).toHaveProperty('token')
        expect(typeof response.token).toBe('string')
    })

    test('Login with Invalid Credentials', async ({ api }) => {
        const response = await api
            .path('/auth/login')
            .body({ username: 'yeti', password: 'n2e5fd2v' })
            .postRequest(401)

    })
})