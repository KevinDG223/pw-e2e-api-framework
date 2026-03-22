import { APIRequestContext } from "@playwright/test"
import { expect } from '@playwright/test'
import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)


export class RequestHandler {

    private authToken: string | null = null
    private request: APIRequestContext
    private baseUrl: string | undefined
    private defaultBaseUrl: string | undefined
    private apiPath: string = ''
    private queryParams: object = {}
    private apiHeaders: Record<string, string> = {}
    private apiBody: object = {}
    private schema: object | null = null

    constructor(request: APIRequestContext, apiBaseUrl: string) {
        this.request = request
        this.defaultBaseUrl = apiBaseUrl
    }

    url(url: string) {
        this.baseUrl = url
        return this
    }

    path(path: string) {
        this.apiPath = path
        return this
    }

    params(params: object) {
        this.queryParams = params
        return this
    }

    headers(headers: Record<string, string>) {
        this.apiHeaders = headers
        return this
    }

    body(body: object) {
        this.apiBody = body
        return this
    }

    setToken(token: string) {
        this.authToken = token
        return this
    }

    validateWith(schema: object){
        this.schema = schema
        return this 
    }

    async getRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.get(url, {
            headers: this.getHeaders()
        })
        expect(response.status()).toEqual(statusCode)
        const text = await response.text()
        const responseJSON = text ? JSON.parse(text) : null

        return responseJSON
    }

    async postRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.post(url, {
            headers: {
                'Content-Type': 'application/json',
                ...this.getHeaders()
            },
            data: this.apiBody
        })
        return await this.validateResponse(response, statusCode)
    }

    async putRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.put(url, {
            headers: this.getHeaders(),
            data: this.apiBody
        })
        return await this.validateResponse(response, statusCode)
    }
    async patchRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.patch(url, {
            headers: this.getHeaders(),
            data: this.apiBody
        })
        return await this.validateResponse(response, statusCode)
    }

    async deleteRequest(statusCode: number) {
        const url = this.getUrl()
        const response = await this.request.delete(url, {
            headers: this.getHeaders()
        })
        return await this.validateResponse(response, statusCode)
    }

    private async validateResponse(response: any, expectedStatus: number) {
        expect(response.status()).toEqual(expectedStatus)
        const text = await response.text()
        let responseJSON

        try {
            responseJSON = text ? JSON.parse(text) : null
        } catch (error) {
            responseJSON = { message: 'Response is not a valido JSON', raw: text }
        }

        if(this.schema && responseJSON){
            const validate = ajv.compile(this.schema)
            const valid = validate(responseJSON)

            if(!valid){
                const errors = JSON.stringify(validate.errors, null, 2)
                throw new Error(`Schema Validation Failed: ${errors}`)
            }
        }
        this.reset()
        return responseJSON
    }
    private reset() {
        this.apiPath = ''
        this.queryParams = {}
        this.apiHeaders = {}
        this.apiBody = {}
        this.schema = null
    }

    private getHeaders() {
        const headers = { ...this.apiHeaders }
        if (this.authToken) {
            headers['Authorization'] = `Bearer ${this.authToken}`
        }
        return headers
    }

    private getUrl() {
        const base = this.baseUrl ?? this.defaultBaseUrl
        const url = new URL(`${base}${this.apiPath}`)
        for (const [key, value] of Object.entries(this.queryParams)) {
            url.searchParams.append(key, String(value))
        }
        return url.toString()
    }
}