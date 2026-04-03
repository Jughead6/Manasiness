import './detailsublayout.css'

function DetailSubLayout({ image, details }) {
    return (
        <div className="detail-sublayout">
                <img src={image} alt="Detail" />

            <div className="detail-info">
                <h2>Information</h2>
                {details.map((item, index) => (
                    <h3 key={index}>{item}</h3>
                ))}
            </div>
        </div>
    )
}

export default DetailSubLayout