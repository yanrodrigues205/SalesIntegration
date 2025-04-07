export type MPCreateTokenType =
{
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    user_id: number;
    live_mode: boolean
}