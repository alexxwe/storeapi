import type { ProductListDto } from '$lib/types/productList.dto.js'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }): Promise<{ product: ProductListDto | null; products: Array<ProductListDto> }> {
    try {
        //products
        const productsResponse = await fetch('https://fakestoreapi.com/products')
        const productsData = await productsResponse.json()
        const products: Array<ProductListDto> = []

        for (const product of productsData) {
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

        const response =await fetch(`https://fakestoreapi.com/products/${params.slug}`)
        const data: ProductListDto = await response.json()


        return {
            products,
            product: data,
        }
    } catch (e: unknown) {
        return {
            products: [],
            product: null,
        }
    }
}
export type pageData = {
    products: Array<ProductListDto>
}

export type PageLoad = {
    fetch: typeof fetch
    params: {
        slug: string
    }
}

