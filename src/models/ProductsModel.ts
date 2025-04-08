import { database } from "../database/Connection";
import ProductDTO from "../dtos/ProductDTO";

export default class ProductsModel
{
    constructor()
    {

    }

    protected async createProduct(product: ProductDTO) : Promise<object | false>
    {
        try
        {
            const create = await database.products.create({
                data:{
                    name: product.name,
                    description: product.description,
                    value: product.value,
                    image: product.image,
                    stock: product.stock,
                    categories_id: product.category_id,
                    user_id: product.user_id
                }
            });

            return create;
        }
        catch(error)
        {
            console.error(error);
            return false;
        }
    }


    protected async getAllProducts() : Promise<object | false>
    {
        try
        {
            const getall = await database.products.findMany({
                where: {
                    deleted_at: null
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    value: true,
                    image: true,
                    stock: true,
                    categories_id: true,
                    user_id: true,
                    created_at: true,
                    updated_at: true,
                    deleted_at: true
                }
            });

            if(getall.length >= 1)
                return getall;
            else
                return false;
        }   
        catch(error)
        {
            console.error(error);
            return false;
        }
    }
}