import CategoriesModel from "../models/CategoriesModel";

export default class CategoriesController extends CategoriesModel
{
    constructor()
    {
        super();
    }

    public async getone(req : any, res : any, internal_use : boolean = false)
    {
        const data = req.body;


        if(!data.id)
        {
            return res.status(400).json({
                message: "Para buscar informaçõe de uma categoria é necessário informar sua identificação.",
                status: 400
            });
        }

        const get = super.getOneById(data.id);

        if(!get)
        {
            return res.status(401).json({
                message: "Não foi encontrado nenhuma categoria com essa identificação.",
                status: 401
            });
        }

        if(!internal_use)
            return res.status(200).json(get);
        else
            return get;
    }
}