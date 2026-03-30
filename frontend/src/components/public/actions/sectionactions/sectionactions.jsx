import './sectionactions.css'

function SectionCategories({action}) {


    return (
        <div id="section-categories">
            {action.map((item, i) => (
                <div className="categories" key={i}>
                    <h3>{item[0]}</h3>
                    <img src={item[1]} alt={item[0]} />
                    {item.slice(2).map((info, j) => (
                        <h4 key={j}>{info}</h4>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SectionCategories