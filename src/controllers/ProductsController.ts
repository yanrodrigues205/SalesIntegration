import ProductsModel from "../models/ProductsModel";
import CategoriesController from "./CategoriesController";

export default class ProductsController extends ProductsModel
{

    private categories_controller: CategoriesController;
    constructor()
    { 
        super();
        this.categories_controller = new CategoriesController();
    }

    public async create(req: any, res: any, internal_use : boolean = false)
    {
        const data = req.body;

        if(!data.name || !data.description || !data.value || !data.image || !data.stock || !data.category_id || !data.user_id)
        {
            return res.status(400).json({
                message: "Preencha todos os campos para concluir o cadastro de produto",
                status: 400
            });
        }

        if(typeof data.value !== 'number')
        {
            return res.status(401).json({
                message: "O campo valor deve ser um número, não escreva o mesmo com aspas ou algo do tipo",
                status: 401
            });
        }


        if(typeof data.stock !== "boolean")
        {
            return res.status(401).json({
                message: "O campo de estoque deve ser verdadeiro ou falso, pois o mesmo define que existe o produto ainda",
                status: 401
            });
        }

        //verificar se categoria existe
        const verifyCategory = this.categories_controller.getone(req, res, true);

        



    }
}