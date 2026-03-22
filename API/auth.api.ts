import { LoginSchema } from "../schemas//auth.schema"

export class AuthApi {
    private endpoint = '/auth/login'
    constructor(private api: any) { }

    async login(credentials: object) {

        if (process.env.CI) {
            console.log('CI Detected: Using Mocked Auth Token to bypass Cloudflare');
            const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token';
            this.api.setToken(mockToken);
            return { token: mockToken };
        }

        const response = await this.api
            .path(this.endpoint)
            .body(credentials)
            .validateWith(LoginSchema)
            .postRequest(201)

        if (response && response.token) {
            this.api.setToken(response.token)
        }
        return response
    }
}