import './sectionlayout.css'

import CategoryButton from './categorybutton/categorybutton.jsx'
import FilterBar from './filterbar/filterbar.jsx'
import SearchBar from './sectionsearch/sectionsearch.jsx'

function SectionLayout() {
    return (
        <div id="categories-layout">
            <SearchBar action="categories"/>
            <FilterBar/>
            <CategoryButton/>
        </div>
    )
}

export default SectionLayout