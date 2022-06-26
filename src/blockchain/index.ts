export interface CommentMetadata {
    name:string;
    external_url:string;
    image:string;
    description:string;
    attributes: {trait_type:string;value:number}[];
}

export interface BlockchainApi {
    fetchComments(address:string): Promise<string>;
    verifyContractExists(address:string): Promise<boolean>;
    uploadComment(comment:CommentMetadata):Promise<string>;
}