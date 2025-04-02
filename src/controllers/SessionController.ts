import { compare } from "bcryptjs";
import Session from "../dtos/SessionDTO";
import SessionsModel from "../models/SessionsModel";
import OTP from "../@types/OTP";
import axios from 'axios';
import AuthMiddeware from "../middleware/AuthMiddleware";


export default class SessionsController extends SessionsModel
{ 
    constructor()
    {
        super();
    }


    public async firstFactor(req: any, res: any)
    {
        const data: Session = req.body;

        if(!data.email || !data.password)
        {
            return  res.status(400).json({
                        message: "Preencha todos os campos para entrar na sua conta!",
                        status: 400
                    });
        }


        const verifyEmail : any = await super.verifyEmail(data.email);

        if(!verifyEmail)
        {
            return  res.status(401).json({
                        message: "O email não foi encontrado no sistema, digite novamente!",
                        status: 401
                    });
        }

        const comparePass = await compare(data.password, verifyEmail.password)

        if(!comparePass)
        {
            return  res.status(403).json({
                        message: "A senha digitada esta incorreta, digite novamente!",
                        status: 403
                    });
        }

        const firstFactorSend : OTP | false = await super.twoFactors_sendCode(verifyEmail.email, verifyEmail.id);

        if(!firstFactorSend)
        {
            return res.status(421).json({
                message: "Não foi possível concluir o o primeiro passo da authenticação dois fatores.",
                status: 421
            });
        }

        return res.status(202).json({
            message: "Para concluir a authenticação, verifique a caixa de emails aonde foi enviado o código de verificação.",
            id_OTP: firstFactorSend.id,
            expiry: firstFactorSend.expiry,
            status: 202
        });
    }

    public async secondFactor(req: any, res: any)
    {
        const data = req.body;

        if(!data.otp || !data.id || data.otp.length != 6)
        {
            return  res.status(400).json({
                        message: "Indentificação de fatores faltando campos, tente novamente.",
                        status: 400
                    });
        }

        let secondFactorVerify : any = await super.twoFactors_verifyCode(data.id, data.otp);

        if(!secondFactorVerify)
        {
            return  res.status(401).json({
                message: "Indentificação de fatores inválida, tente novamente.",
                status: 401
            });
        }

        if(secondFactorVerify == true)
        {
            secondFactorVerify = "";
        }


        const insertSession = await super.insert(data.id);

        if(!insertSession)
        {
            return  res.status(402).json({
                message: "Não foi possível realizar a criação da sessão!",
                status: 402
            });
        }

        return  res.status(202).json({
            message: "Sessão iniciada com sucesso!",
            user_id: secondFactorVerify.id,
            token: insertSession,
            status: 202
        });
    }


    public async verifySession(req: any, res: any)
    {
        const data = req.body;

        if(!data.token)
        {
            return  res.status(400).json({
                        message: "Para a verificação de sessão é necessário informar o token.",
                        status: 400
                    });
        }

        let response : any = await AuthMiddeware.verifyRoute(data.token);

        if(!response)
        {
            return  res.status(401).json({
                message: "Não foi possível decodificar o token.",
                status: 401
            });
        }

        if(!response.payload.id_twofactors)
        {
            return  res.status(402).json({
                message: "Sessão inexistente dentro do sistema, tente novamente.",
                status: 402
            });
        }
        const getDataSession = await super.sessionDataByTwoFactorsID(response.payload.id_twofactors);
        return res.status(202).json(getDataSession);
    }
}