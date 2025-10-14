export const SelectionCircle = ({ isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={
                `w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${isSelected ? "border-[#828282] bg-white hover:border-gray-600" 
                    :"border-[#828282] bg-white hover:border-gray-600"
                }`
            }
            aria-label={isSelected ? "Unselect item" : "Select item"}
        >       
            {isSelected && (
                <svg
                    className="w-3 h-3 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="3" 
                        d="M5 13l4 4L19 7" 
                    >    
                    </path>
                </svg>
            )}
        </button>
    )
}