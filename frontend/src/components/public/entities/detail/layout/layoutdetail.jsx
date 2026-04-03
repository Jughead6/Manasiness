import './layoutdetail.css'
import DetailTitle from './detailtitle/detailtitle'
import DetailSubLayout from './detailsublayout/detailsublayout'

function LayoutDetail({ detail }) {
    return (
        <div className="detail-layout">
            <DetailTitle name={detail.name} />
            <DetailSubLayout image={detail.image} details={detail.details} />
        </div>
    )
}

export default LayoutDetail