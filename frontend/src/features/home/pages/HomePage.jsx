import "./HomePage.css"

function HomePage() {
    return (
        <div className="home-page">
            <div className="home-page-section">
                <h1 className="home-page-title">Welcome to Manasiness</h1>
            </div>

            <div className="home-page-section home-page-section-purpose">
                <div className="home-page-purpose">
                    <h2 className="home-page-section-title">Purpose</h2>
                    <h3 className="home-page-subsection-text">Manasiness simplifies business management by organizing and summarizing your data, helping you save time and stay in control.</h3>
                </div>

                <div className="home-page-instructions">
                    <h2 className="home-page-section-title">Instructions</h2>

                    <div className="home-page-subsection">
                        <div className="home-page-instruction-card">
                            <h3>First you must create a category in order to create the products.</h3>
                            <button>Create Categories</button>
                        </div>

                        <div className="home-page-instruction-card">
                            <h3>Second, you need to create products in order to start your statistics.</h3>
                            <button>Create Products</button>
                        </div>

                        <div className="home-page-instruction-card">
                            <h3>And optionally, you can create users according to your needs: Suppliers, Worker or Customers.</h3>
                            <button>Create Users</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home-page-section home-page-section-tutorial">
                <div className="home-page-tutorial-wrapper">
                    <h2 className="home-page-section-title">Tutorial</h2>

                    <div className="home-page-subsection">
                        <div className="home-page-tutorial-card">
                            <h3>Actions</h3>

                            <ul>
                                <li>
                                    Categories
                                    <h4>Here you can manage your categories.</h4>
                                </li>

                                <li>
                                    Products
                                    <h4>Here you can manage your products.</h4>
                                </li>

                                <li>
                                    Users
                                    <h4>Here you can manage your users.</h4>
                                </li>
                            </ul>
                        </div>

                        <div className="home-page-tutorial-card">
                            <h3>Your Space</h3>

                            <ul>
                                <li>
                                    Sales
                                    <h4>Here you can register sales and view your complete sales history.</h4>
                                </li>

                                <li>
                                    Customers
                                    <h4>Here you can manage customer information and track payment status.</h4>
                                </li>
                            </ul>
                        </div>

                        <div className="home-page-tutorial-card">
                            <h3>Admin</h3>

                            <ul>
                                <li>
                                    Workers
                                    <h4>Here you can view and manage your workforce information.</h4>
                                </li>

                                <li>
                                    Statistics
                                    <h4>Here you can view complete business statistics.</h4>
                                </li>

                                <li>
                                    Suppliers
                                    <h4>Here you can manage orders, payment status, and supplier information.</h4>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage