export default function Heading({label,color}){
    return(
    <div className={`font-bold text-4xl p-6 ${color}`}>
        {label}
    </div>
    )
}