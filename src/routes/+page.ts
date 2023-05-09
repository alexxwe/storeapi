import type { ProductListDto } from '$lib/types/productList.dto.js'
import type { UserDto } from '$lib/types/users.dto.js'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }): Promise<{ products: Array<ProductListDto>; users: Array<UserDto> }> {
    try {
        //products
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        const products: Array<ProductListDto> = []

        for (const product of data) {
            products.push({
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: product.rating,
            })
        }
        //------------
        //users
        const userResponse = await fetch('https://fakestoreapi.com/users')
        const users: UserDto[] = await userResponse.json()
        const selectedUser = users.map(user => ({
            id: user.id,
            email: user.email,
            username: user.username,
            name: {
                firstname: user.name.firstname,
                lastname: user.name.lastname,
            },
            phone: user.phone,
            address: {
                geolocation: {
                    lat: user.address.geolocation.lat,
                    long: user.address.geolocation.long,
                },
                city: user.address.city,
                street: user.address.street,
                number: user.address.number,
                zipcode: user.address.zipcode,
            },
            password: user.password,
            __v: user.__v,
        }))

        return {
            products,
            users: selectedUser,
        }
    } catch (e: unknown) {
        return {
            products: [],
            users: [],
        }
    }
}
