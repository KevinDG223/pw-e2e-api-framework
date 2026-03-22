import { CartSchema} from '../utils/schemas/cart.schema'

export class CartApi {
    private readonly endpoint = '/carts'
    constructor(private api: any) { }

    async getCartById(cartId: number) {
        return await this.api
            .path(`${this.endpoint}/${cartId}`)
            .validateWith(CartSchema)
            .getRequest(200)
    }

    async createCart(userId: number, products: Array<{ productId: number, quantity: number }>) {
        const body = {
            userId: userId,
            date: new Date().toISOString().split('T')[0],
            products: products
        }

        return await this.api
            .path(this.endpoint)
            .body(body)
            .validateWith(CartSchema)
            .postRequest(201)
    }

    async updateCart(cartId: number, products: Array<{ productId: number, quantity: number }>) {
        return await this.api
            .path(`${this.endpoint}/${cartId}`)
            .body({ products })
            .validateWith(CartSchema)
            .putRequest(200)
    }

    async deleteCart(cartId: number) {
        return await this.api
            .path(`${this.endpoint}/${cartId}`)
            .deleteRequest(200)
    }
}