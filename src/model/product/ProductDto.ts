import {Category} from "@/model/category/Category";

export interface ProductDto {
    id: number;
    name: string;
    imageUrl: Blob;
    price: number;
    stock: number;
    productStatus: string;
    productType: string;
    deleted: boolean;
    categories: Category[];
}