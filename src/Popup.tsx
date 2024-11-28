import "./Popup.less"

// component for a popup screen
export function Popup({className, title, message, onClick, buttonText}: {className: string, title: string, message: string, onClick: () => void, buttonText: string}) {
    return (
        <div className={"popup "+className}>
            <h2>{title}</h2>
            <p>{message}</p>
            <button onClick={onClick}>{buttonText}</button>
        </div>
    )
}