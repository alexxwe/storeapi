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

    let index = 0

    const next = () => {
        const maxIndex = data.products.length - 5
        index = index === maxIndex ? 0 : index + 5
    }

    const back = () => {
        const maxIndex = data.products.length - 5
        index = index === 0 ? maxIndex : index - 5
    }

    //Cart context
    let _cartContext : Array<ProductDto> = []
    cartContext.subscribe(products => (_cartContext = products))

    const addToCart = () => {
        cartContext.update(products => ([...products, data.product]))
    }
</script>

<main class="bg-gray-200 py-12">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="rounded-lg {bgColor[data.product.category]} {shadowColor[data.product.category]}} p-8">
            <div class="flex">
                <div class="flex flex-shrink-0 items-center">
                    <img class="my-2 w-80 rounded-3xl object-cover" src={data.product.image} alt={data.product.title} />
                </div>
                <div class="my-6 ml-16">
                    <h1 class="mb-6 text-3xl font-bold">{data.product.title}</h1>
                    <h2 class="mb-8 text-xl font-bold text-black">{data.product.category.toUpperCase()}</h2>
                    <p class="mb-8 text-xl">{data.product.description}</p>

                    <div class="mb-4 flex items-center text-xl font-medium">
                        <span class="mr-4">{rating(data.product.rating.rate)}</span>
                        <span class="text-blue-800">({data.product.rating.count}) ratings</span>
                    </div>

                    <div class="mr-4 mb-12 flex items-center">
                        <span class="text-4xl font-bold text-black">{data.product.price}€</span>
                    </div>

                    <button class="rounded bg-blue-500 py-2 px-4  text-xl font-bold text-white hover:bg-blue-700" on:click={addToCart}> Add to Cart </button>
                </div>
            </div>
        </div>

        <div class="mt-8 rounded bg-white">
            <h2 class="mb-4 ml-2 text-4xl font-bold text-black">Related Products</h2>
            <div class="m-4 mx-auto flex rounded bg-white">
                <ul class="mx-4 my-4 grid grid-cols-5 gap-4">
                    {#each data.products.slice(index, index + 5) as product}
                        <a href="/product/{product.id}">
                            <li class="rounded-lg p-4 pb-6 text-center {bgColor[product.category]} {shadowColor[product.category]}">
                                <p class="my-2 truncate text-xl"># {product.id} {product.title}<br /></p>
                                <p class="my-2 font-bold text-black">{product.category.toUpperCase()}<br /></p>
                                <img src={product.image} alt={product.title} class="rounded-xl my-4 mx-auto h-40" />
                                <p class="rounded-lg text-3xl text-black">{product.price}€</p>
                            </li>
                        </a>
                    {/each}
                </ul>
            </div>
            <div class="mb-4 flex justify-center gap-2">
                <div class="mb-2">
                    <button class="rounded bg-blue-500 px-8 py-2 text-white" on:click={back}> Back </button>
                    <button class="rounded bg-blue-500 px-8 py-2 text-white" on:click={next}> Next </button>
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
    </div>
</main>
