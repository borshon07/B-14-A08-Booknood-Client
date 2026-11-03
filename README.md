# BookNook

**BookNook** is a small online library where readers can share books and borrow them for a few days.
The idea is simple: **add a book, borrow a book, return a book.**

## Live Site

**Client:** https://a08-booknood-client.vercel.app

**Server API:** https://b-14-a08-booknood-sever.vercel.app

## Demo Login

Use this account to explore the private pages quickly, or register a new one.

```
Email: your_demo_email
Password: your_demo_password
```

## Key Features

- **Authentication:** Email and password register and login, plus Google login, built with BetterAuth and the MongoDB adapter.
- **Password validation:** Registration needs an uppercase letter, a lowercase letter and at least 6 characters. Invalid passwords show an error and are not registered.
- **Private routes with redirect-back:** Add Book, My Books, My Borrows and Book Details are protected. A logged-out user is sent to Login, then returned to the same page after logging in.
- **Add a book:** Form with title, author, category, description, total copies and book image uploaded to imgbb. The added date is saved automatically.
- **Edit and delete books:** My Books shows only the books you added. Edit opens a pre-filled form, and delete uses a custom confirm modal.
- **Borrow system:** The Borrow button opens a modal with the user name and email (read-only). All borrowed books appear in a table with a Return Book button.
- **Available copies:** Borrowing decreases the copies by 1 and returning increases it by 1 using `$inc`. At 0 copies the button is disabled and shows "Not Available".
- **No double borrow:** A user cannot borrow the same book twice at the same time, and an error toast is shown.
- **JWT protected API:** The Express server verifies a BetterAuth JWT on protected routes. Only the owner can edit or delete their own book, and borrows are read from the token.
- **Search and filter:** Search by title or author, filter by category, show only available books and sort the list.
- **Home page:** Swiper hero slider with a 3D featured book, New Arrivals (latest 6 books from the database), featured collections, recommendations, How Borrowing Works and Top Categories.
- **Dark and light theme:** Theme toggle in the navbar with a warm light theme and an obsidian dark theme, both using a tangerine accent.
- **Animation:** Framer Motion for scroll reveals, card tilt, navbar and hero effects. Reduced motion is respected.
- **Responsive design:** Works on mobile, tablet and desktop, with a drawer menu on small screens.
- **Extras:** Custom 404 page, loading spinner, toast messages for every success and error, and a unique page title on each route.

## Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home |
| `/books` | Public | All books with search and filter |
| `/books/:id` | Private | Book details and borrow |
| `/add-book` | Private | Add a new book |
| `/my-books` | Private | Edit and delete your books |
| `/my-borrows` | Private | Your borrowed books and return |
| `/profile` | Private | View and update your profile |
| `/login`, `/register` | Public | Authentication |

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Animation and UI:** Framer Motion, Swiper, Lucide icons, Sonner (toast)
- **Authentication:** BetterAuth, MongoDB adapter, JWT
- **Backend:** Express.js, MongoDB (separate repository)
- **Image upload:** imgbb
- **Deployment:** Vercel

## Run Locally

1. Install packages:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_IMGBB_KEY=your_imgbb_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. Start the server (see the server repository), then run:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Server Repository

Add your server GitHub link here.