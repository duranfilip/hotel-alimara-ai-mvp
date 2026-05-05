import React from "react";
import { useMemo, useState } from "react";
import { classifyRequest } from "../utils/classifierLogic.js";

const classifierExamples = [
  "Hi, we are a company looking for a meeting room for around 90 people next month. We need a projector, coffee break, lunch, and maybe parking for some attendees. Can you send us options?",
  "Hola, queremos celebrar una comunión para unas 45 personas con comida y decoración floral. Todavía no tenemos fecha cerrada.",
  "We need a conference space for 400 people with catering, audiovisual equipment and access to an outdoor area for networking.",
];

export default function EventClassifier() {
  const [request, setRequest] = useState("");
  const [classification, setClassification] = useState(null);

  function runClassifier(customRequest) {
    const value = customRequest ?? request;
    setRequest(value);
    setClassification(classifyRequest(value));
  }

  const detailRows = useMemo(() => {
    if (!classification || classification.error) return [];
    return [
      ["Estimated Size", classification.estimatedSize, "group"],
      ["Date and Time", classification.dateTime, "calendar"],
      ["Requested Services", classification.requestedServices.join(", "), "service"],
      ["Correct Department", classification.department, "mail"],
      ["Reasoning", classification.reasoning, "spark"],
    ];
  }, [classification]);

  return (
    <section className="toolGrid">
      <article className="card toolCard">
        <div className="sectionHeader">
          <p className="eyebrow">Events team workflow</p>
          <h2>Event Request Classifier</h2>
          <p className="sectionCopy">
            Paste an unstructured event inquiry and receive a staff-ready summary, routing decision, and reply draft.
          </p>
        </div>
        <textarea
          value={request}
          onChange={(event) => setRequest(event.target.value)}
          placeholder="Paste an event request from a guest, company, wedding couple, or family..."
        />
        <button className="primaryAction" type="button" onClick={() => runClassifier()}>
          Classify Request
        </button>
        {classification?.error ? <div className="emptyState">{classification.error}</div> : null}
        {classification && !classification.error ? (
          <div className="classificationPanel">
            <div className="resultHero">
              <div>
                <span className="resultLabel">Request Summary</span>
                <p>{classification.summary}</p>
              </div>
              <div className="badgeStack" aria-label="Classification badges">
                <span className="badge typeBadge">{classification.eventType}</span>
                <span className={`badge ${classification.urgency.toLowerCase()}`}>{classification.urgency} urgency</span>
                <span className={`badge ${classification.confidence.toLowerCase()}`}>{classification.confidence} confidence</span>
              </div>
            </div>

            <div className="detailGrid">
              {detailRows.map(([label, value, icon]) => (
                <div className="detailCard" key={label}>
                  <span className={`lineIcon ${icon}`} aria-hidden="true" />
                  <div>
                    <span>{label}</span>
                    <p>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="resultBlock">
              <span className="resultLabel">Missing Information</span>
              <div className="chipList">
                {classification.missingInformation.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="replyGrid">
              <div className="resultBlock">
                <span className="resultLabel">Suggested Staff Reply</span>
                <p>{classification.suggestedReply}</p>
              </div>
              <div className="resultBlock priority">
                <span className="resultLabel">Internal Priority Note</span>
                <p>{classification.internalPriorityNote}</p>
              </div>
            </div>
          </div>
        ) : !classification?.error ? (
          <div className="emptyState">Classification results will appear here after you submit a request.</div>
        ) : null}
      </article>

      <aside className="card sideCard">
        <h3>Example requests</h3>
        <div className="exampleList">
          {classifierExamples.map((example) => (
            <button key={example} type="button" onClick={() => runClassifier(example)}>
              {example}
            </button>
          ))}
        </div>
      </aside>
    </section>
  );
}
