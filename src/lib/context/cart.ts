import type { ProductDto } from '$lib/types/product.dto'
import { writable, type Writable } from 'svelte/store'

export const cartContext: Writable<Array<ProductDto>> = writable([])
