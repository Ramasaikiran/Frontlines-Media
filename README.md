Frontlines Media – Frontend Assignment (React + Vite + Google Gemini API)

A clean, modern, and production-ready Companies Directory Application built using React (Vite) and Google Gemini 2.0 API for generating dynamic company data.

This project showcases:

AI-powered company directory API

Search, filter, sorting & pagination

Clean UI components

Strong frontend architecture

Integration with Google GenAI Schema-guided responses

🚀 Run Locally
Prerequisites

Node.js v18+

npm or yarn

Google Gemini API Key

📦 Clone the Repository
git clone https://github.com/Ramasaikiran/Frontlines-Media.git
cd Frontlines-Media

Generate real Indian company data

Apply filters, sorting, pagination

Enforce strict schemas

Return consistent JSON API responses

🎨 Run the Frontend (React + Vite)

Open a terminal:

cd frontend
npm install
npm run dev


The app will be available at:

👉 http://localhost:5173

📂 Project Structure

```
Frontlines-Media/
│
└── frontend/                    # Main React project
    ├── public/                  # Static assets
    ├── src/
    │   ├──   fetchCompanies.ts              
    │   ├── components/          # UI components
    │   │   ├── CompanyCard.tsx
    │   │   ├── Filters.tsx
    │   │   └── Pagination.tsx
    │   ├── types/               # TypeScript types & interfaces
    │   ├── App.tsx              # Main app logic
    │   ├── App.css              # Styling
    │   ├── main.tsx             # Vite entry point
    │   └── index.css            # Global styles
    ├── package.json             # Dependencies & scripts
    ├── index.html               # HTML template
    └── vite.config.ts           # Vite configuration
   ```

⚙️ How It Works

✔ Fetches dynamically generated realistic Indian companies from Gemini
✔ Searches by:

Company name

Short description

✔ Filters by:

Industry

City

✔ Sorting:

Name

Founded year

✔ Pagination:

Page number

Items per page

✔ Schema-validated responses using:

responseSchema

responseMimeType: 'application/json'

✔ Placeholder logos:

https://picsum.photos/seed/COMPANY_NAME/200

📡 API Query Parameters

Your AI API simulation supports:

Feature	Example
Search	?q=reliance
Industry filter	?industries=Software
City filter	?location=Bengaluru
Sort	?sort=name
Page	?page=2
Limit	?limit=10
🧪 Testing & Linting

(Optional – not included by default)
You can add:

Jest + React Testing Library

ESLint + Prettier

Vite Preview Build:

npm run build
npm run preview

🚀 Deployment

You can deploy easily on:

Vercel

Netlify

Cloudflare Pages

GitHub Pages

Build command:

npm run build


Creates a production dist/ folder.

🤝 Contributing

Contributions, issues, and feature requests are welcome.

Steps:
Fork the repository
git checkout -b feature/AmazingFeature
git commit -m "Add AmazingFeature"
git push origin feature/AmazingFeature
Open a Pull Request

🛠️ Future Enhancements

🔹 Infinite scroll
🔹 Material UI / Tailwind redesign
🔹 Company details modal/page
🔹 Server-side caching
🔹 Real backend instead of AI API
🔹 Dark mode

📜 License

This project is licensed under the MIT License.

🙌 Credits

Built by Rama Sai Kiran
Part of the Frontlines Media Assignment
