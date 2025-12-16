import { Homedata } from "../data/Homedata"

function FeatureItem (){
    return (
        <section className="features">
            {Homedata.map((item, index) => (
                <div className="feature-item" key={index}>
                <img src={item.img} alt={item.alt + " Icon"}  className="feature-icon" />
                <h3 className="feature-item-title">{item.h3}</h3>
                <p>{item.p} </p>
            </div>
            ))}   
        </section>
    )
            
    
}

export default FeatureItem