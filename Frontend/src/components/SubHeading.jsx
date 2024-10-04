export default function SubHeading({label,color}){
    return(
    <div className={`font-bold text-2xl pt-4 pb-4 ${color}`}>
        {label}
    </div>
    )
}