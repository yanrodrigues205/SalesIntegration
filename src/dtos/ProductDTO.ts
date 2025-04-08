interface ProductDTO
{
    readonly name : string;
    readonly description : string;
    readonly value : number;
    readonly image : string;
    readonly stock: boolean;
    readonly category_id : string;
    readonly user_id: string;
}

export default ProductDTO;