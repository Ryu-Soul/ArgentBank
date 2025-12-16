import { Userdata } from "../data/Userdata"

function Accounts (){
    return (
        <div className="accounts">
            {Userdata.map((item, index) => (
                <section className="account" key={index}>
                    <div className="account-content-wrapper">
                    <h3 className="account-title">{item.title}</h3>
                    <p className="account-amount">{item.amount}</p>
                    <p className="account-amount-description">{item.description}</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">{item.button}</button>
                    </div>
                </section>
            ))}   
        </div>
    )
    
}

export default Accounts