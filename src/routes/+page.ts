import type { ProductListDto } from '$lib/types/productList.dto.js';


/** @type {import('./$types').PageLoad} */
export async function load({fetch}): Promise<{products: Array<ProductListDto>}> {
    try{
    const response = await fetch("https://fakestoreapi.com/products")
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
        



        return{
            products,
        }
    
    } catch (e: unknown){
        return{
            products: [],
        }
    }
}
