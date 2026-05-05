# Written Document Draft: AI Solutions for Hotel Alimara Barcelona

## 1. Purpose of the FAQ Assistant

The first MVP is a Hotel Alimara FAQ Assistant designed to help guests find clear answers to common practical questions before or during their stay. The assistant simulates an AI-style hotel support experience, but it does not use an external AI model. Instead, it uses a fixed local knowledge base based on official Hotel Alimara website information and simple keyword matching.

The purpose is to reduce repetitive questions for reception and reservations staff while giving guests quick, reliable information. This is especially useful for topics where guests often need immediate answers, such as arrival times, breakfast hours, parking, room types, event spaces, and contact information.

## 2. Main Questions the FAQ Assistant Answers

The FAQ Assistant is designed to answer questions about Hotel Alimara's identity, location, contact details, reception, languages, rooms, check-in, check-out, early check-in, late check-out, parking, electric charging, breakfast, restaurant, bar, events, laundry, massage service, sustainability, pet policy, Wi-Fi, airport access, city-center connection, accessibility, families, gym, luggage storage, and payment.

It is intentionally limited. If a guest asks about unsupported topics, uncertain details, live availability, current promotions, exact availability, room prices, or restaurant menu items, the assistant does not invent an answer. It tells the user that it does not have confirmed information and recommends contacting Hotel Alimara directly by phone. This limitation is a strength because it reduces hallucinations and keeps the assistant reliable. Breakfast prices and discounts are also treated as information that should be confirmed directly with the hotel.

## 3. Second Challenge Chosen

The second MVP focuses on event request classification. Hotel Alimara has 14 modular event rooms and can host corporate meetings, conferences, weddings, banquets, and family celebrations. Event inquiries often arrive as unstructured messages, with some details included and others missing.

## 4. Problem or Inefficiency Identified

Unstructured event requests can take time for staff to read, interpret, route to the correct department, and convert into a useful follow-up response. Important information may be missing, such as exact date, number of attendees, budget, room layout, catering needs, audiovisual needs, accommodation needs, or contact details. If staff have to manually identify these details every time, the process can become slower and less consistent.

## 5. Why AI Makes Sense in Both Cases

AI-style tools are useful in both cases because they help transform natural language into structured action. For the FAQ Assistant, the user asks a normal question and receives a direct answer from verified hotel information. For the Event Request Classifier, staff can paste a free-text inquiry and receive a structured summary, event type, department routing, missing information checklist, confidence level, reasoning, and suggested reply.

In this MVP, the intelligence is implemented with local rules rather than a real AI API. This makes the demo reliable, easy to explain, and safe for an exam context because it avoids hallucinated hotel information.

## 6. What the Second MVP Does

The Event Request Classifier analyzes an event request and produces twelve sections: request summary, event type, estimated size, date and time, requested services, urgency, correct department, missing information, suggested staff reply, internal priority note, confidence, and reasoning.

It can identify corporate meetings, conferences, trainings, weddings, banquets, family celebrations, social events, and unclear requests. It also extracts attendee numbers, recognizes common services such as catering, coffee breaks, projector, audiovisual equipment, garden access, accommodation, parking, decoration, photography, and video, and routes requests to the correct Hotel Alimara department when possible.

## 7. Tools Used

The web app was built with React and Vite. The logic is written in local JavaScript modules. No backend, database, API key, external AI model, OpenAI API, Gemini API, Claude API, or environment variables are required. The app can be run with `npm install` and `npm run dev`, and can be deployed easily on Netlify or Vercel.

## 8. Main Limitations and Risks

The FAQ Assistant is limited by its local knowledge base. It is reliable for confirmed topics, but it cannot answer questions that require live hotel data, such as exact availability, current promotions, or unlisted policies.

The Event Request Classifier is rule-based, so it may misclassify ambiguous or unusual messages. It should be used as a staff support tool, not as an automatic decision-maker. It does not confirm availability, does not invent prices, and does not promise a specific room or service. Human staff should review every final reply before sending it to a guest or client.
