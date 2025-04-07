import paymentService from "../services/mercadoPago/paymentService";

export default class PaymentController extends paymentService
{
    constructor()
    {
        super();
    }

    public async createPix(req: any, res: any)
    {
        const data : any = req.body;

        if(!data.value || !data.description || !data.email)
        {
            return  res.status(400).json({
                message: "Para concluir a geração de pagamento é necessário o prenchimento de todos os campos(valor, descrição e email)",
                status: 400
            });
        }

        if(data.value < 0.01 || data.value == "")
        {
            return  res.status(400).json({
                message: "Para concluir a operação é necessário digitar um valor válido, que seja superio a R$ 0.01",
                status: 400
            });
        }


        let create = await super.createPixPayment(data.value, data.description, data.email);

        if(!create)
        {
            
            return  res.status(401).json({
                message: "Não foi possível a geração do pagamento via pix, entre em contato com os desenvolvedores.",
                status: 401
            });
        }


        return res.status(202).json(create);


    }
}
