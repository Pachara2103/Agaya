export function StatusButton({ text, colorOn, colorOff, handler, state, setState }) {
    // const [state, setState] = useState(true);
    return (
        <>
            <div
                className={`flex items-center justify-center self-center p-4 h-8 w-24 text-white text-[13px] cursor-pointer ${state ? colorOn : colorOff
                    }`}
                onClick={() => setState(!state)}
            >
                <div className="m-1">{text}</div>
            </div>
        </>
    );
}