import apiClient from "./apiClient";
import type { IProduct } from "@/features/catalog/types";

//Функция запроса хитов продаж
async function getTopSales(): Promise<IProduct[]>{
    return apiClient<IProduct[]>('top-sales');
}

export default getTopSales;