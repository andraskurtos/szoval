import "./Popup.less"

// component for a popup screen
export function Popup({className, title, message, onClick, buttonText, onClick2, button2Text}: {className: string, title: string, message: string, onClick: () => void, buttonText: string, onClick2?: () => void, button2Text?: string}) {
    return (
        <div className={"popup "+className}>
            <h2>{title}</h2>
            <p>{message}</p>
            <ul>
                <li>
                    <button onClick={onClick}>{buttonText}</button>
                </li>
                <li>
                    <button className={button2Text?"":"invisible"} onClick={onClick2}>{button2Text}</button>
                </li>
            </ul>
        </div>
    )
}