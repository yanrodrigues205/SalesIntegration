export class MPCreateTokenDto
{
    //usa para definir dados antes da request
    client_secret : string;
    client_id : string;
    grant_type: string;

    constructor(client_secret: string, client_id: string, grant_type: string)
    {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.grant_type = grant_type;
    }
}