# Sports Blog

A modern and responsive blog focused on sports news (Football, Basketball, and Volleyball), built using core web technologies. The project includes a dynamic news loading system and a simplified administrative panel.

---

## Features

- **Category Navigation:** Dedicated pages for Football, Basketball, and Volleyball.
- **Dynamic News Feed:** Automatic post loading via JSON.
- **Post Reading:** Individual article view system using URL parameters.
- **Admin Panel:** Interface for creating and deleting posts (local data management).
- **Responsive Design:** Optimized for multiple screen sizes.

---

## Tech Stack

- **Markup:** Semantic HTML5  
- **Styling:** CSS3 (Flexbox & Grid)  
- **Logic:** Vanilla JavaScript (ES6+)  
- **Data Layer:** JSON (Local persistence)  
- **Hosting:** Vercel  

---

## Architecture

```mermaid
graph TD
    UI[index.html] --> CAT[Categories / Basketball, Football, Volleyball]
    UI --> NEWS[News / General Feed]
    NEWS --> POST[Posts / Individual View]
    
    subgraph "Core Logic"
        JS[js/base.js] -.-> |Header/Footer Injection| UI
        DATA[(data/posts.json)] --> |Fetch| NEWS
        DATA --> |Fetch| POST
    end

    subgraph "Admin"
        ADM[adm/new] --> |Export JSON| DATA
        DEL[adm/delete] --> |Export JSON| DATA
    end
````

---

## Project Structure

```text
Blog-Esporte/
├── adm/             # Admin panel (manual CRUD)
├── assets/          # Static assets (images and icons)
├── categorias/      # Category pages
├── css/             # Modular stylesheets
├── data/            # Data storage (JSON)
├── js/              # Application logic and DOM manipulation
├── pages/           # Auxiliary pages (news, posts, contact)
└── index.html       # Application entry point
```

---

## Getting Started

This project relies on dynamic component injection, so it requires a local server to run properly.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/isllanrx/Blog-Esporte.git
   ```

2. **Start a local server:**

   * **VS Code:** Use the *Live Server* extension
   * **Python:**

     ```bash
     python -m http.server 8000
     ```
   * **Node.js:**

     ```bash
     npx serve .
     ```

3. **Access the app:**

   ```
   http://localhost:8000
   ```

---

## Administration

To avoid the need for a complex database, administration is handled via data export:

1. Access `/adm/new` or `/adm/delete`
2. Perform the desired operation
3. The system will download a new `posts.json` file
4. Replace the existing file in `data/posts.json`

---

## Team

* Isllan Toso Pereira
* Gabriel Bruno Oliveira Pereira
* Ramsés de Oliveira Martins
* Gustavo Raasch Müller
* Pedro Henrique dos Santos Amorim

© 2023 - Academic Project
