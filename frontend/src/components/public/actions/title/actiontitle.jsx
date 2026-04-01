import './actiontitle.css'

function ActionTitle({ title, subtitle }) {
    return (
        <div id="action-title">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
    )
}

export default ActionTitle