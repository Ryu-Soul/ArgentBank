import "../styles/global.scss"

import React from 'react'
import iconMoney from "../assets/images/icon-money.webp"
import iconChat from "../assets/images/icon-chat.webp"
import iconSecurity from "../assets/images/icon-security.webp"
import FeatureItem from "../components/FeaturesItem"


export default function Home() {
  return (
    <main>
      <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
      </div>
        <FeatureItem />
    </main>
)
}