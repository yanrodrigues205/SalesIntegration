import { database } from "../database/Connection";
import CategoryDTO from "../dtos/CategoryDTO";
export default class CategoriesModel
{
    constructor()
    {

    }

    protected async createCategory(category: CategoryDTO) : Promise<object | false> 
    {
        try
        {
            const create = await database.categories.create({
                data:{
                    title: category.title,
                    description: category.description,
                    user_id: category.user_id
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

    protected async getOneById(category_id : string) : Promise<object | false>
    {
        try
        {
            const getone = await database.categories.findUnique({
                where: {
                    id: category_id
                }
            });

            if(getone)
                return getone;
            else
                return false;

        }
        catch(error)
        {
            console.error(error);
            return false;
        }
    }


    protected async getAllCategories() : Promise<object | false>
    {
        try
        {
            const getall = await database.categories.findMany({
                where:{
                    deleted_at: null
                },
                select:{
                    id: true,
                    title: true,
                    description: true,
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