import './sectiontitle.css'

function SectionTitle({ title, subtitle }) {
    return (
        <div id="section-title">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
    )
}

export default SectionTitle