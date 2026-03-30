import './Categories.css'

import SectionTitle from '../../../components/public/actions/sectiontitle/sectiontitle.jsx'
import SectionLayout from '../../../components/public/actions/sectionlayout/sectionlayout.jsx'
import SectionCategories from '../../../components/public/actions/sectionactions/sectionactions.jsx'



function Categories() {
    const categories = [
        ["Category: Bread", "https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/1:1/w_2560%2Cc_limit/milk-bread.jpg", "Created at: 03/30/2026"],
        ["Category: Milk", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKRc1vsNojeMRzLpjSF-_g3ihYlGBwVgpNqw&s", "Created at: 03/30/2026"],
        ["Category: Egg", "https://upload.wikimedia.org/wikipedia/commons/f/f0/Fried_Egg_2.jpg", "Created at: 03/30/2026"],
        ["Category: Apple", "https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/articles/health_tools/healing_foods_slideshow/1800ss_getty_rf_apples.jpg?resize=750px:*&output-quality=75", "Created at: 03/30/2026"],
        ["Category: Banana", "https://thefinestexotics.co.uk/cdn/shop/files/Apple_Banana.jpg?v=1754235829&width=1946", "Created at: 03/30/2026"],
        ["Category: Potato", "https://www.southernliving.com/thmb/LMXRx0gG8xUMnWwfiEwVt6lsgcw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Quick-Baked-Potato_Step1_Audit-7973_0463-1-8332a81a6c1b4cbfa7bb470c1e807986.jpg", "Created at: 03/30/2026"],
        ["Category: Fish", "https://5.imimg.com/data5/SELLER/Default/2023/7/330683955/FO/CB/VY/30490815/fish-food-500x500.jpg", "Created at: 03/30/2026"]
    ]
    return (
        <div id="categories">
            <SectionTitle  title="Welcome to Categories" subtitle="In this section you can create, edit and view the categories you have"/>
            <SectionLayout/>
            <SectionCategories action={categories}/>
        </div>
    )
}

export default Categories