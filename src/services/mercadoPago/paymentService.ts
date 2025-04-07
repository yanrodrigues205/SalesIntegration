import AuthService from "./authService";
import axios, {AxiosResponse} from "axios";
import { v4 as uuidv4 } from 'uuid';
export default class paymentService extends AuthService
{
    private _payment_url: string;
    constructor()
    {
        super();
        this._payment_url = "https://api.mercadopago.com/v1/payments";
    }

    protected async createPixPayment(value: number, description: string, payer_email: string)
    {
        const auth = await this.createToken();
        const transaction_information = {
            "transaction_amount": value,
            "description": description,
            "payment_method_id": "pix",
            "payer": {
                "email": payer_email
            }
        }
        try
        {
            const response : AxiosResponse = await axios.post(this._payment_url,
                transaction_information,
                {
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.access_token}`,
                        'X-Idempotency-Key': uuidv4()
                    }
                }
            );

            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao tentar criar pagamento PIX no mercado pago.", error);
            throw new Error("Erro ao processar requisição de criação de pagamento PIX no mercado pago.");
        }
    }
}