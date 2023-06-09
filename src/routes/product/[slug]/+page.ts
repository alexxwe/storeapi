import type { ProductDto } from '$lib/types/product.dto.js'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }): Promise<{ product: ProductDto | null; products: Array<ProductDto> }> {
    try {
        //products
        const productsResponse = await fetch('https://fakestoreapi.com/products')
        const products: Array<ProductDto> = await productsResponse.json()

        const response = await fetch(`https://fakestoreapi.com/products/${params.slug}`)
        const data: ProductDto = await response.json()

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
    products: Array<ProductDto>
}

export type PageLoad = {
    fetch: typeof fetch
    params: {
        slug: string
    }
}
