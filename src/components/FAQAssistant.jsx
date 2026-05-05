import React from "react";
import { useState } from "react";
import { answerFaq } from "../utils/faqLogic.js";

const faqExamples = [
  "What time is check-in and check-out?",
  "Can I park at the hotel and how much does it cost?",
  "What time is breakfast on Sunday?",
  "Do you have meeting rooms for a company event of 120 people?",
  "Can I bring my pet?",
];

export default function FAQAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello. Ask me a confirmed question about Hotel Alimara rooms, check-in, breakfast, parking, events, restaurant, reception, sustainability, laundry, or massage services.",
    },
  ]);

  function askFaq(customQuestion) {
    const nextQuestion = customQuestion ?? question;
    const answer = answerFaq(nextQuestion);

    if (!nextQuestion.trim()) {
      setMessages((current) => [...current, { role: "assistant", text: answer }]);
      return;
    }

    setMessages((current) => [
      ...current,
      { role: "user", text: nextQuestion.trim() },
      { role: "assistant", text: answer },
    ]);
    setQuestion("");
  }

  return (
    <section className="toolGrid">
      <article className="card toolCard">
        <div className="sectionHeader">
          <div className="sectionTitleRow">
            <span className="infoIcon faq" aria-hidden="true" />
            <div>
              <p className="eyebrow">Guest support</p>
              <h2>Hotel Alimara FAQ Assistant</h2>
              <p className="sectionCopy">
                A reliable chat-style assistant that only answers from verified local hotel information.
              </p>
            </div>
          </div>
          <p className="reliabilityNote">
            Reliability boundary: the assistant refuses uncertain or live-information questions instead of inventing answers.
          </p>
        </div>
        <div className="chatWindow" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`bubble ${message.role}`} key={`${message.role}-${index}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form
          className="inputRow"
          onSubmit={(event) => {
            event.preventDefault();
            askFaq();
          }}
        >
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about check-in, breakfast, parking, rooms, events..."
          />
          <button type="submit">Ask</button>
        </form>
      </article>

      <aside className="card sideCard">
        <h3>Try a question</h3>
        <div className="exampleList">
          {faqExamples.map((example) => (
            <button key={example} type="button" onClick={() => askFaq(example)}>
              {example}
            </button>
          ))}
        </div>
      </aside>
    </section>
  );
}
