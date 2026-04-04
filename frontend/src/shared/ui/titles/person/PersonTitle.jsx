import './PersonTitle.css'

function PersonTitle({ name, title }) {
    return (
        <div className="shared-person-title">
            <h1>{title}: {name}</h1>
        </div>
    )
}

export default PersonTitle