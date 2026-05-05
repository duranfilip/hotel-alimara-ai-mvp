import React from "react";
import { informationCategories } from "../data/hotelKnowledge.js";

export default function InfoSections() {
  return (
    <>
      <section className="infoGrid">
        <article className="card infoCard">
          <div className="sectionTitleRow">
            <span className="infoIcon local" aria-hidden="true" />
            <div>
              <p className="eyebrow">How it works</p>
              <h2>Transparent local logic</h2>
            </div>
          </div>
          <div className="processList">
            <span>The FAQ Assistant uses a fixed local knowledge base and keyword matching.</span>
            <span>The Event Request Classifier uses local rule-based text analysis.</span>
            <span>No real booking, availability, or pricing decision is made.</span>
            <span>Human staff should review all final replies.</span>
          </div>
        </article>
        <article className="card infoCard">
          <div className="sectionTitleRow">
            <span className="infoIcon verified" aria-hidden="true" />
            <div>
              <p className="eyebrow">Information used</p>
              <h2>Verified hotel categories</h2>
            </div>
          </div>
          <div className="tagList">
            {informationCategories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="whySection">
        <div className="sectionHeader">
          <p className="eyebrow">Why this matters</p>
          <h2>Practical value for hotel operations</h2>
        </div>
        <div className="whyGrid">
          <article className="card">
            <span className="infoIcon faq" aria-hidden="true" />
            <h3>FAQ Assistant</h3>
            <p>Reduces repetitive guest questions and improves pre-arrival confidence.</p>
          </article>
          <article className="card">
            <span className="infoIcon events" aria-hidden="true" />
            <h3>Event Request Classifier</h3>
            <p>Helps staff process unstructured event inquiries faster and more consistently.</p>
          </article>
        </div>
      </section>
    </>
  );
}
