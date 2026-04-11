import "./PageTitle.css"

function PageTitle({ title, subtitle }) {
    return (
        <div className="shared-page-title">
            <h1>{title}</h1>
            {subtitle ? <h2>{subtitle}</h2> : null}
        </div>
    )
}

export default PageTitle
