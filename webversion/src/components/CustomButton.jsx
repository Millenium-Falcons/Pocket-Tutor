export default function CustomButton({label,onClick,width}){
    return(
    <button type="button" onClick={onClick} className={`text-orange-400 w-${width} text-white bg-amber-400	 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 my-5`} >{label}</button>
    )
}