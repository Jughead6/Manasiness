import "./PersonTitle.css"

function PersonTitle({ name, title, sectionTitle}) {
    return (
        <div className="shared-person-title">
            <h2>{sectionTitle}</h2>
            <h1>{title}: {name}</h1>
        </div>
    )
}

export default PersonTitle