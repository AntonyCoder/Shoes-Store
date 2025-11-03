import apiClient from "./apiClient";
import type { ITopSales } from "@/features/topSales/types";

async function getTopSales(): Promise<ITopSales[]>{
    return apiClient<ITopSales[]>('top-sales');
}

export default getTopSales;