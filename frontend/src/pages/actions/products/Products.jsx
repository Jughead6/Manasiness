import './Products.css'

import ActionTitle from '../../../components/public/actions/title/actiontitle.jsx'
import ActionLayout from '../../../components/public/actions/layout/actionlayout.jsx'
import ActionContent from '../../../components/public/actions/content/actioncontent.jsx'



function Products() {
        const products = [
        ["Product: Whole Milk", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKRc1vsNojeMRzLpjSF-_g3ihYlGBwVgpNqw&s", "Description: Fresh whole milk bottle", "Category: Dairy", "Cost price: 4", "Sale price: 6", "Stock: 30"],
        ["Product: Brown Bread", "https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/1:1/w_2560%2Cc_limit/milk-bread.jpg", "Description: Soft bread for breakfast", "Category: Bakery", "Cost price: 3", "Sale price: 5", "Stock: 20"],
        ["Product: Red Apple", "https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/articles/health_tools/healing_foods_slideshow/1800ss_getty_rf_apples.jpg?resize=750px:*&output-quality=75", "Description: Sweet red apple", "Category: Fruits", "Cost price: 2", "Sale price: 4", "Stock: 50"],
        ["Product: Banana Pack", "https://thefinestexotics.co.uk/cdn/shop/files/Apple_Banana.jpg?v=1754235829&width=1946", "Description: Fresh banana bunch", "Category: Fruits", "Cost price: 3", "Sale price: 5", "Stock: 40"],
        ["Product: Potato Bag", "https://www.southernliving.com/thmb/LMXRx0gG8xUMnWwfiEwVt6lsgcw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Quick-Baked-Potato_Step1_Audit-7973_0463-1-8332a81a6c1b4cbfa7bb470c1e807986.jpg", "Description: Potatoes for daily cooking", "Category: Vegetables", "Cost price: 5", "Sale price: 8", "Stock: 25"]
    ]

    return (
        <div id="products">
            <ActionTitle  title="Welcome to Products" subtitle="In this section you can create, edit and view the products you have"/>
            <ActionLayout/>
            <ActionContent action={products}/>
        </div>
    )
}

export default Products