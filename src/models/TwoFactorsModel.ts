import { database } from "../database/Connection";
import MailerService from "../services/MailerService";
import generateOTP from "../services/OTPService";
import OTP from "../@types/OTP";

export default class TwoFactorsModel extends MailerService
{
    constructor()
    {
        super();
    }

    protected async create(email: string, user_id: string) : Promise<OTP | false>
    {
        let otp:string = generateOTP();
        let now = new Date();
        let expiry = new Date(now.getTime() + 10 * 60000); // 10 minutes before now date

        super.setEmail(email);
        super.setSubject("CÓDIGO DE ACESSO AO SISTEMA - Clean City");
        super.setText(`Este código é referente a sua tentativa de authenticação no sistema: <strong>${otp}</strong>`);

        try
        {
            await super.sendMailer();
            const insert : OTP = await database.twoFactors.create({
                data:{
                    user_id: user_id,
                    expiry: expiry,
                    OTP: otp,
                    verify: false
                },
                select:{
                    id:true,
                    expiry: true
                }
            });
            if(insert)
                return insert;
            else
                return false;
        }
        catch(err)
        {
            console.error(err);
            return false;
        }
    }

    protected async verify(id_receiver: string, OTP_receiver: string) : Promise<false | string>
    {
        try
        {
            let today = new Date();
            const verify = await database.twoFactors.findUnique({
                where:{
                    id: id_receiver
                }
            });

            if(verify!.expiry >= today)
            {
                console.log("esta no tempo")
            }
            

            if(verify && verify.OTP == OTP_receiver && verify.expiry >= today)
            {
                let id_us = verify.user_id;

                const update = await database.twoFactors.update({
                    where:{
                        id: id_receiver
                    },
                    data:{
                        verify: true
                    }
                });

                if(update && id_us)
                {
                    return id_us;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        catch(err)
        {
            console.log(err)
            return false;
        }
    }

}