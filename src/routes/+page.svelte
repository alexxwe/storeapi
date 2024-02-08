<script lang="ts">
    import '../app.css'
    import type { ProductDto } from '$lib/types/product.dto'
    import { bgColor, shadowColor, userColor } from '$lib/utils/colors'
    import Product from '$lib/components/Product.svelte'
    import type { UserDto } from '$lib/types/users.dto'
    import GlowProduct from '$lib/components/GlowProduct.svelte'

    /** @type {import('./$types').PageData} */
    export let data: {
        products: Array<ProductDto>
        users: Array<UserDto>
    }

    let search = ''
    let categories: string[] = []

    async function handleSearch() {
        if (!search) {
            window.location.reload()
            return
        }
        const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(search).toLowerCase()}`)
        const searchData = await response.json()
        data.products = searchData
    }

    async function fetchCategories() {
        const categoryResponse = await fetch('https://fakestoreapi.com/products/categories')
        categories = await categoryResponse.json()
    }
    fetchCategories()

    //users
    // let activeUser: UserDto = data.users[-1]
    let activeUser: UserDto | null = null

    export function handleUser(e: any) {
        const selectedIndex = e.target.selectedIndex
        activeUser = data.users[selectedIndex - 1]
        document.body.classList.remove(...Object.values(userColor))
        document.body.classList.add(userColor[activeUser.id])
    }

    //Carousel buttons
    let index = 0

    const next = () => {
        const maxIndex = data.products.length - 4
        index = index === maxIndex ? 0 : index + 4
    }

    const back = () => {
        const maxIndex = data.products.length - 4
        index = index === 0 ? maxIndex : index - 4
    }
</script>

<header class="flex items-center justify-between p-8">
    <!-- max-w-7xl = 80rem (1280px)  -::::-  max-w-screen-2xl = (1536px)-->
    <div>
        <input
            type="text"
            placeholder=" Category Search"
            class="rounded border px-1 text-black"
            bind:value={search}
            on:keydown={event => {
                if (event.key === 'Enter') {
                    handleSearch()
                }
            }}
            list="categories-list"
        />
        <button class="rounded bg-blue-600 py-1 px-2 font-bold text-white hover:bg-blue-700 mt-2 md:mt-0" on:click={handleSearch}> Search </button>

        <datalist id="categories-list">
            {#each categories as category}
                <option value={category} />
            {/each}
        </datalist>
    </div>

    <!-- <h1 class="font-bold text-4xl">Storwe</h1> -->

    <div class="flex items-center text-black">
        <p class="mr-8">{activeUser ? activeUser.username : ''}</p>
        <select
            id="userSelect"
            class="focus:shadow-outline rounded border border-gray-400 bg-zinc-400 px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
            on:change={handleUser}
        >
            <label for="userSelect">Select User: </label>
            <option value="" disabled selected>Select user</option>
            {#each data.users as user}
                <option value={user.id}>{user.username}</option>
            {/each}
        </select>
    </div>
</header>

<div class="mx-auto max-w-screen-2xl">
    <!-- <h1 class="text-center font-bold text-4xl p-8">Storwe page.svelte</h1> -->
    {#if data.products.length === 0}
        <p class="p-4 text-center text-4xl font-bold">ERROR: Categoria no disponible</p>
    {:else}
        <ul>
            <li class="mx-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {#each data.products as product}
                    <!-- <GlowProduct {product} /> -->
                    <Product {product} />
                {/each}
            </li>
        </ul>
    {/if}

    <div class="mt-1 rounded bg-white">
        <h2 class="mb-4 ml-2 mt-16 text-4xl font-bold text-black">Related Products</h2>
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
                            <div class="bg-white rounded-lg">
                                <img src={product.image} alt={product.title} class="rounded-xl my-4 mx-auto h-40" />
                            </div>
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
</div>
