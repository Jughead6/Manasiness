import './pagetitle.css'

function PageTitle({ title, subtitle }) {
    return (
        <div className="page-title">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
    )
}

export default PageTitle