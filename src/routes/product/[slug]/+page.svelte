<script lang="ts">
    import { cartContext } from '$lib/context/cart'
    import type { ProductDto } from '$lib/types/product.dto'
    import { bgColor, shadowColor } from '$lib/utils/colors'

    /** @type {import('./$types').PageData} */
    export let data: {
        product: ProductDto
        products: Array<ProductDto>
    }

    function rating(rate: number) {
        const star = Math.floor(rate)
        const half = rate - star
        const additionalStar = half > 0.5 ? '⭐' : ''
        const stars = '⭐'.repeat(star) + additionalStar
        return stars
    }

    let dif = data.product.id % 4 === 0 ? 4 : data.product.id % 4
    let index = data.product.id - dif
    const next = () => {
        const maxIndex = data.products.length - 4
        index = index === maxIndex ? 0 : index + 4
    }

    const back = () => {
        const maxIndex = data.products.length - 4
        index = index === 0 ? maxIndex : index - 4
    }

    //Cart context
    let _cartContext: Array<ProductDto> = []
    cartContext.subscribe(products => (_cartContext = products))

    const addToCart = () => {
        cartContext.update(products => [...products, data.product])
    }
</script>

<main class="py-12">
    <div class="mx-auto max-w-xs md:max-w-7xl sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white {shadowColor[data.product.category]}} p-8">
            <div class="md:flex items-center">
                <div class="md:flex md:flex-shrink-0">
                    <img class="my-2 w-80 rounded-3xl object-cover" src={data.product.image} alt={data.product.title} />
                </div>
                <div class="md:my-6 md:ml-16">
                    <h1 class="mb-6 text-3xl font-bold text-black">{data.product.title}</h1>
                    <h2 class="mb-8 text-xl font-bold text-black">{data.product.category.toUpperCase()}</h2>
                    <p class="mb-8 text-xl text-black">{data.product.description}</p>

                    <div class="mb-4 flex items-center text-xl font-medium">
                        <span class="mr-4">{rating(data.product.rating.rate)}</span>
                        <span class="text-black">({data.product.rating.count}) ratings</span>
                    </div>

                    <div class="mr-4 mb-12 flex items-center">
                        <span class="text-4xl font-bold text-black">{data.product.price}€</span>
                    </div>

                    <button class="rounded bg-blue-700 py-2 px-4 text-xl font-bold text-white hover:bg-blue-900" on:click={addToCart}> Add to Cart </button>
                </div>
            </div>
        </div>
    </div>
</main>

<div class="mt-8 rounded bg-white">
    <h2 class="mb-4 ml-2 text-4xl font-bold text-black">Related Products</h2>
    <div class="flex justify-center gap-2 md:hidden">
        <button class="rounded bg-blue-600 px-8 py-2 text-white" on:click={back}> Back </button>
        <button class="rounded bg-blue-600 px-8 py-2 text-white" on:click={next}> Next </button>
    </div>
    <div class="m-4 mx-auto flex rounded bg-white text-black">
        <ul class="mx-4 my-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {#each data.products.slice(index, index + 4) as product}
                <li class="rounded-lg hover:scale-105 p-4 pb-6 text-center bg-white {shadowColor[product.category]}">
                    <a href="/product/{product.id}">
                        <p class="my-2 truncate text-xl"># {product.id} {product.title}<br /></p>
                        <p class="my-2 font-bold">{product.category.toUpperCase()}<br /></p>
                        <img src={product.image} alt={product.title} class="rounded-xl my-4 mx-auto h-40 scale-75" />
                        <p class="rounded-lg text-3xl font-semibold">{product.price}€</p>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
    <div class="mb-4 flex justify-center gap-2">
        <div class="mb-2">
            <button class="rounded bg-blue-600 px-8 py-2 text-white" on:click={back}> Back </button>
            <button class="rounded bg-blue-600 px-8 py-2 text-white" on:click={next}> Next </button>
        </div>
    </div>
</div>
<div class="fixed top-4 right-4 m-4 mt-20 rounded bg-white p-2 text-black shadow">
    <span class="text-xl font-bold">Cart: {_cartContext.length}</span>
    <div class="mt-2">
        {#each _cartContext as item}
            <div class="mb-2 flex items-center border-b border-gray-300 pb-2">
                <img class="mr-2 h-12 w-12 rounded object-contain" src={item.image} alt={item.title} />
                <p class="underline">{item.price}€</p>
                {item.id}
                <p class="text-md ml-2 max-w-[20ch] truncate overflow-ellipsis">{item.title}</p>
            </div>
        {/each}
    </div>
</div>
