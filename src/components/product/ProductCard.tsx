import { ProductDto } from "@/model/ProductDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import {getStatusColor, getStatusText} from "@/data/Mapper";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function ProductCard({ product }: { product: ProductDto | undefined }) {

    return (
        <div className="relative bg-white cursor-pointer hover:shadow-2xl rounded-lg p-6 mx-2 my-4 h-90 w-80">
            <div className="flex justify-center items-center relative">
                <img
                    src={`data:image/jpeg;base64,${product?.imageUrl}`}
                    alt={product?.name}
                    className="rounded-md h-48 transition duration-300 ease-in-out hover:scale-110"
                />
                <span className={`text-s text-white rounded-b-full font-semibold ml-2 px-4 py-4 rounded absolute -top-6 right-2 ${getStatusColor(product?.productStatus)}`}>
                    {getStatusText(product?.productStatus)}
                </span>
            </div>
            <h1 className="mt-4 text-xl font-bold text-gray-800">{product?.name}</h1>
            {product?.productStatus !== "PREORDER" && (
                <p className="mt-2 text-gray-500">Залиха: {product?.stock}</p>
            )}
            <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-semibold text-gray-900">{product?.price} ден</p>
                <div className="flex space-x-4">
                    <button className="text-blue-400 hover:text-blue-700 text-xl">
                        <FontAwesomeIcon icon={faCartPlus as IconProp} className="mr-2" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 text-xl">
                        <FontAwesomeIcon icon={faHeart as IconProp} className="mr-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}
