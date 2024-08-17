import { ProductDto } from "@/model/product/ProductDto";
import { Page } from '@/model/Page';
import axiosInstance from '@/config/axiosInstance';

export const getProductDetails = async (id: number): Promise<ProductDto> => {
    try {
        const response = await axiosInstance.get<ProductDto>(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product", error);
        throw error;
    }
};

export const getAllProducts = async (page: number,
                                     size: number,
                                     searchFilter: string,
                                     categoryFilter: string,
                                     sortFilter: string,
                                     productStatus: string): Promise<Page<ProductDto>> => {
    try {
        const response = await axiosInstance.get<Page<ProductDto>>('/product/products', {
            params: { page, size, searchFilter, categoryFilter, sortFilter, productStatus },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
        throw error;
    }
};
