export interface CategoryProps{
    catIndex:{
        index:number,
        cat:string
    },
    setCatIndex:React.Dispatch<React.SetStateAction<any>>;
}

export interface BlogProps{
    id:number,
    title:string,
    subtitle:string,
    preview_image:string,
    description:string,
    category:string

}