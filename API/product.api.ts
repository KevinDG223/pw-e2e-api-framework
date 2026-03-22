import { ProductSchema, ProductListSchema } from '../utils/schemas/products.schema'
export class ProductApi {
    constructor(private api: any) { }

    async getAll() {
        return await this.api
            .path('/products')
            .validateWith(ProductListSchema)
            .getRequest(200)
    }

    async getWithLimit(limit: number, offset: number = 0) {
        return await this.api
            .path('/products')
            .params({ limit, offset })
            .validateWith(ProductListSchema)
            .getRequest(200)
    }

    async getById(id: number) {
        return await this.api
            .path(`/products/${id}`)
            .validateWith(ProductSchema)
            .getRequest(200)

    }

    async createProduct(data: object) {
        return await this.api
            .path('/products')
            .body(data)
            .validateWith(ProductSchema)
            .postRequest(200)
    }

    async updateProduct(id: number, data: object) {
        return await this.api
            .path(`/products/${id}`)
            .body(data)
            .validateWith(ProductSchema)
            .putRequest(200)
    }

    async deleteProduct(id: number) {
        return await this.api
            .path(`products/${id}`)
            .deleteRequest(200)
    }
}