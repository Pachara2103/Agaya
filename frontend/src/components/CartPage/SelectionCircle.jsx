export const SelectionCircle = ({ isSelected, onClick, selectId }) => {
    const isItemSelected = isSelected.includes(selectId);

    const circleClasses = `
        relative p-1 rounded-full cursor-pointer transition-all duration-100
        flex items-center justify-center
        ${isItemSelected 
            ? "border-2 border-[#48B3AF] bg-white" 
            : "border-2 border-[#828282] bg-white hover:border-gray-600" 
        }
    `;

    const innerDotClasses = `
        w-3 h-3 rounded-full
        ${isItemSelected 
            ? "bg-[#48B3AF] scale-100" 
            : "bg-[#828282] scale-100" 
        }
    `;

    return (
        <button
            onClick={onClick}
            className={circleClasses}
            aria-label={isItemSelected ? "Unselect item" : "Select item"}
            type="button"
        >
            <div className={innerDotClasses}/>
        </button>
    );
};
