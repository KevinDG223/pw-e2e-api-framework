import { LoginSchema } from "../schemas/auth.schema"

export class AuthApi {
    private endpoint = '/auth/login'
    constructor(private api: any) { }

    async login(credentials: object) {
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