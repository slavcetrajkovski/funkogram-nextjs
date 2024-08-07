"use client";
import React, { useEffect, useState } from "react";
import { getProductDetails } from "@/service/ProductService";
import ProductCard from "@/components/product/ProductCard";
import { usePathname } from "next/navigation";
import { ProductDto } from "@/model/ProductDto";

export default function ProductPageComponent() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [product, setProduct] = useState<ProductDto>();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await getProductDetails(Number(id));
          setProduct(fetchedProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  return <ProductCard product={product} />;
}
