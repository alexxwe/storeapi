import type { ProductDto } from '$lib/types/product.dto.js'
import type { UserDto } from '$lib/types/users.dto.js'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }): Promise<{ products: Array<ProductDto>; users: Array<UserDto> }> {
    try {
        //products
        const response = await fetch('https://fakestoreapi.com/products')
        const products: Array<ProductDto> = await response.json()

        //users
        const userResponse = await fetch('https://fakestoreapi.com/users')
        const users: UserDto[] = await userResponse.json()

        return {
            products,
            users,
        }
    } catch (e: unknown) {
        return {
            products: [],
            users: [],
        }
    }
}
