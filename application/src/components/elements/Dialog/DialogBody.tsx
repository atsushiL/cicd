type Props ={
    customStyle?:string
    content:string
}

export const DialogBody:React.FC<Props> = ({customStyle,content}) =>{
    return <h4 className={`text-center text-xl my-5 ${customStyle}`}>{content}</h4>
}