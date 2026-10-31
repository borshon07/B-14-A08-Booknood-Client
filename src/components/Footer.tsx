import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        {/* logo and about */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span>📚</span>
            <span>BookNook</span>
          </div>
          <p className="text-sm">
            A small online library. Add a book, borrow a book, return a book.
          </p>
        </div>

        {/* contact */}
        <div className="space-y-2 text-sm">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p>Email: support@booknook.com</p>
          <p>Phone: +880 1234 567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* social links */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex items-center gap-4">
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
              </svg>
            </Link>
            {/* new X logo */}
            <Link href="https://x.com" target="_blank" aria-label="X">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link href="https://github.com" target="_blank" aria-label="GitHub">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-sm">
       © 2026 BookNook. All rights reserved.
      </div>
    </footer>
  );
}