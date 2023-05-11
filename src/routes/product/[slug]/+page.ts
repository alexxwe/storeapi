import type { ProductListDto } from '$lib/types/productList.dto.js'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }): Promise<{ product: ProductListDto | null }> {
    try {
        const response =await fetch(`https://fakestoreapi.com/products/${params.slug}`)
        const data: ProductListDto = await response.json()

        return {
            product: data,
        }
    } catch (e: unknown) {
        return {
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

