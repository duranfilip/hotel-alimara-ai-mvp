import React from "react";
import { useState } from "react";
import EventClassifier from "./components/EventClassifier.jsx";
import FAQAssistant from "./components/FAQAssistant.jsx";
import Header from "./components/Header.jsx";
import InfoSections from "./components/InfoSections.jsx";

export default function App() {
  const [activeTab, setActiveTab] = useState("faq");

  return (
    <main className="appShell">
      <Header />

      <nav className="tabs" aria-label="MVP tabs">
        <button className={activeTab === "faq" ? "active" : ""} type="button" onClick={() => setActiveTab("faq")}>
          Hotel Alimara FAQ Assistant
        </button>
        <button className={activeTab === "classifier" ? "active" : ""} type="button" onClick={() => setActiveTab("classifier")}>
          Event Request Classifier
        </button>
      </nav>

      {activeTab === "faq" ? <FAQAssistant /> : <EventClassifier />}

      <InfoSections />
    </main>
  );
}
