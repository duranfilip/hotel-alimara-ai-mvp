import React from "react";

export default function Header() {
  return (
    <header className="siteHeader">
      <div className="topBar">
        <div className="brandMark">hotel alimara</div>
        <div className="mvpLabel">AI hospitality exam MVP</div>
        <a className="phoneLink" href="tel:+34934270000">
          +34 934 270 000
        </a>
      </div>
      <div className="hero">
        <div className="heroMedia" aria-hidden="true">
          <div className="citySilhouette" />
        </div>
        <div className="heroContent">
          <p className="eyebrow">Hotel Alimara Barcelona</p>
          <h1>AI Solutions MVP Demo</h1>
          <p className="intro">
            Two simple AI-enabled MVPs for Hotel Alimara: guest FAQ support and event request classification.
          </p>
          <p className="disclaimer">
            Demo based on verified public information. Availability, prices, and policies should be confirmed directly with the hotel.
          </p>
          <div className="heroStats" aria-label="Hotel profile summary">
            <span>Guest support</span>
            <span>Event triage</span>
            <span>Local knowledge base</span>
            <span>Human-reviewed replies</span>
          </div>
        </div>
      </div>
    </header>
  );
}
