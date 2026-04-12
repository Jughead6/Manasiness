import "./Playground.css"

function Playground() {

    return (
        <div className="home">
            <div className="home-welcome">
                <div  className="home-welcome-left">
                    <h2 >Welcome to dashbard!</h2>
                    <h1 className="home-welcome-title">Hi, Store Manasiness</h1>
                </div>
                <div className="home-welcome-right">
                    <p className="home-welcome-description">Manasiness is a web that help you in u store . This web give you better organized informacion abaout you store </p>
                </div>
            </div>
            <div className="home-stats">
                <div className="home-stats-section">
                    <div className="home-stats-section-title">
                        <p>Sales</p>
                    </div>
                    <div className="home-stats-section-information">
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Today</p>
                            <p className="home-stats-section-amount">S/ 90</p>
                            <p className="home-stats-section-qunatity">Total Sales: 10</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Weekly</p>
                            <p className="home-stats-section-amount">S/ 90</p>
                            <p className="home-stats-section-qunatity">Total Sales: 10</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Monthly</p>
                            <p className="home-stats-section-amount">S/ 90</p>
                            <p className="home-stats-section-qunatity">Total Sales: 10</p>
                        </div>
                    </div>
                </div>
                <div className="home-stats-section">
                    <div className="home-stats-section-title">
                        <p>Orders</p>
                    </div>
                    <div className="home-stats-section-information">
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Today</p>
                            <p className="home-stats-section-amount">S/ 90</p>
                            <p className="home-stats-section-qunatity">Total Orders: 10</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Weekly</p>
                            <p className="home-stats-section-amount">S/ 90</p>
                            <p className="home-stats-section-qunatity">Total Orders: 10</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Monthly</p>
                            <p className="home-stats-section-amount">S/ 90</p>
                            <p className="home-stats-section-qunatity">Total Orders: 10</p>
                        </div>
                    </div>
                </div>
                <div className="home-stats-section">
                    <div className="home-stats-section-title">
                        <p>Staff</p>
                    </div>
                    <div className="home-stats-section-information">
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Today</p>
                            <p className="home-stats-section-amount">S/ 90</p>
                            <p className="home-stats-section-qunatity">Total Payed: 10</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Weekly</p>
                            <p className="home-stats-section-amount">S/ 90</p>
                            <p className="home-stats-section-qunatity">Total Payed: 10</p>
                        </div>
                        <div className="home-stats-section-date"> 
                            <p className="home-stats-section-time">Monthly</p>
                            <p className="home-stats-section-amount" >S/ 90</p>
                            <p className="home-stats-section-qunatity">Total Payed: 10</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Playground