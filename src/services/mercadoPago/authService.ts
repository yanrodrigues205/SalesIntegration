require("dotenv").config();
import axios, {AxiosResponse} from "axios";
import { MPCreateTokenType } from "../../@types/MPCreateTokenType";

export default class AuthService
{
    private _client_id : string;
    private _client_secret : string;
    private _grant_type : string;
    private _auth_url : string;

    constructor()
    {
        this._client_id = String(process.env.MERCADO_PAGO_CLIENT_ID);
        this._client_secret = String(process.env.MERCADO_PAGO_CLIENT_SECRET);
        this._grant_type = "client_credentials";
        this._auth_url = "https://api.mercadopago.com/oauth/token";
    }


    protected async createToken() : Promise<MPCreateTokenType>
    {
        try
        {
            const response : AxiosResponse<MPCreateTokenType> = await axios.post(this._auth_url,
                {
                    "client_id": this._client_id,
                    "client_secret": this._client_secret,
                    "grant_type": this._grant_type
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            return response.data;

        }
        catch(error)
        {
            console.error("Erro ao tentar acionar criação de token no mercado pago.", error);
            throw new Error("Erro ao processar requisição de criação de token no mercado pago.");
        }
    }
}