import Users from "../dtos/UsersDTO";
import UsersModel from "../models/UsersModel";
import axios from 'axios';

export default class UsersController extends UsersModel
{
    constructor()
    {
        super();
    }

    public async createUser(req: any, res: any, internal_use = false)
    {
        const data: Users = req.body;

        if(!data.name || !data.email || !data.password)
        {
            return  res.status(400).json({
                        message: "Preencha todos os campos para finalizar seu cadastro!",
                        status: 400
                    });
        }
        let pass = data.password;
        if(pass.length < 8)
        {
            return  res.status(401).json({
                        message: "A senha está muito curta , deve conter no mínimo 8 caracteres!",
                        status: 401
                    });
        }


        let emailExists = await super.emailExists(data.email);

        if(emailExists)
        {
            return  res.status(400).json({
                        message: "O email já existe dentro do sistema!",
                        status: 403
                    });
        }

        let register = await super.insert(data);

        if(register)
        {
            return  res.status(202).json({
                        message: "Usuário criado com sucesso!",
                        status: 202
                    });
        }
    }

    // public async bindCollectUser(collectUser_id:string, user_id: string)
    // {

    //     if(!user_id || !collectUser_id)
    //     {
    //         console.error("Preencha os campos corretos para vincular o usuário ao seu cadastro como Coletor.");
    //     }

    //     let insert = await super.updateCollectUser(collectUser_id, user_id);

    //     if(insert)
    //         return true;
    //     else
    //         return false;
    // }

    public async getUserByID(req: any, res: any, internal_use : boolean = false)
    {
        
        const data = req.body;

        if(!data.id)
        {
            return  res.status(400).json({
                        message: "Para concluir a operação é necessário um ID de usuário.",
                        status: 400
                    });
        }

        let getUser = await super.getDataById(data.id);

        if(!getUser)
        {
            
            return  res.status(401).json({
                message: "Está identificação de usuário é inválida, tente novamente.",
                status: 401
            });
        }
        else
        {
            if(!internal_use)
                return res.status(202).json(getUser);
            else
                return getUser;

        }
    }
}