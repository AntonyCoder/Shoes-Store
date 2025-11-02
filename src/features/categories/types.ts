export interface ICategories {
    id: number;
    title: string
}

export interface ICategoriesState {
    items: ICategories[];
    loading: boolean;
    error: string | null;
    selectedCategoryId: number
}