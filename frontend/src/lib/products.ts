import { API_URL } from "./const";
import { Product } from "./models";

let globalProducts: Product[] | null = null;

export async function getProducts(): Promise<Product[]> {
    if (globalProducts) return globalProducts;

    const productsRes = await fetch(API_URL+"/products");
    let products = await productsRes.json();

    globalProducts = products;
    return products;
}