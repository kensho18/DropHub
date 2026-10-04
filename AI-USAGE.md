# AI-USAGE.md

This is one shared file for the whole group. Parts 1 and 2 are written together, as a team. Part 3 is different — each person writes their own part under their own GitHub name, and each person is only graded on their own part.


 1. How I used AI
(at least 6 entries  35 points. For each one: the date and the tool, what we asked for, what it gave us, what we kept or changed and why, and a link to the commit.)

1. Date: Sept 3, 2026  Tool: Claude (Claude.ai)
   We asked for: A style.css file that matches a script.js file we already had, which had code for a login form, a menu, a drop zone, a file list, and a pop-up message.
   It gave us: A full style sheet covering all of those parts.
   We kept/changed: We used it at first, but we had to rewrite it later once we built the real HTML, because the first version didn't match it yet.
   Commit: https://kensho18.github.io/DropHub/

2. Date: Sept 6, 2026  Tool: Claude (Claude.ai)
   We asked for: A login form (username and password) that actually works, not just something that looks like a form.
   It gave us: An index.html with a login form connected to the login code we already had — it shows an error if a box is empty, and shows the menu once you log in.
   We kept/changed: We kept it, and added one more line later so the login form hides itself after you connect, since it forgot to do that at first.
   Commit: https://kensho18.github.io/DropHub/

3. Date: Sept 9, 2026  Tool: Claude (Claude.ai)
   We asked for: Change the site's colors to black and orange.
   It gave us: A new style.css using color variables (like --bg and --orange) for the whole theme.
   We kept/changed: We kept it as is  using variables made it easier to change colors again later.
   Commit: https://kensho18.github.io/DropHub/

4. Date: Sept 13, 2026  Tool: Claude (Claude.ai)
   We asked for: Remove the Admin Settings page, make the file-drop area clearer, and add new things for a "week 2" update.
   It gave us: The Admin page removed, a clearer drop zone with an icon and text, plus a file count/size summary, a Clear All button, and an animated progress bar for uploading.
   We kept/changed: We kept everything.
   Commit: https://kensho18.github.io/DropHub/

5. Date: Sept 16, 2026  Tool: Claude (Claude.ai)
   We asked for: Add a Google sign-in option, using a Gmail or email account.
   It gave us: A working Google sign-in button next to the regular login form, using Google's official sign-in script.
   We kept/changed: We kept it, but it still needs a real Google Client ID before it fully works — AI can't make that part for us, we have to get it ourselves. See Part 2 below.
   Commit: https://kensho18.github.io/DropHub/

6. Date: Sept 20, 2026  Tool: Claude (Claude.ai)
   We asked for: Remove the placeholder "Group members" text, make the DropHub name look more like a real logo, and add more to the Home page.
   It gave us: A styled logo (an icon plus colored text) at the top, and a Home page with a short intro, three feature cards, and a button that goes to the Storage Manager.
   We kept/changed: We kept all of it, and removed old code that would have broken the new logo (see Part 2 below).
   Commit: https://kensho18.github.io/DropHub/

7. Date: Sept 24, 2026  Tool: Claude (Claude.ai)
   We asked for: A new Settings page with a light/dark mode switch, and anything else that would be useful.
   It gave us: A Settings page with a light/dark toggle, 4 accent color choices, a short how-to-use guide, and a reset button. It also remembers your theme and color choice when you come back.
   We kept/changed: We kept all of it.
   Commit: https://kensho18.github.io/DropHub/

8. Date: Sept 28, 2026  Tool: Claude (Claude.ai)
   We asked for: Write README.md and REPORT.md for us, then make the wording simpler and more basic a few times.
   It gave us: Full drafts of both files, rewritten a few times to use simpler and more casual English.
   We kept/changed: We kept it, and kept updating it whenever the actual site changed.
   Commit: https://kensho18.github.io/DropHub/

 Where the AI got it wrong
(3 real cases  25 points)

1. What it gave us: A style.css file written to match HTML the AI assumed we had, without checking our real file first.
   What was wrong: Our real index.html was just a plain starter file — it didn't have any of the things the CSS was styling, so none of it actually worked at first.
   What we did instead: We had the AI rebuild index.html so it actually matched the CSS and JS.
   Date: Sept 3, 2026
   Commit: https://kensho18.github.io/DropHub/

2. What it gave us: Code that reset the header text to just say "DropHub" every time someone logged in.
   What was wrong: Later, we added a styled logo (an icon plus colored text) to that same spot. That old reset code would have deleted the logo every time someone logged in, since it replaces everything in that spot with plain text.
   What we did instead: We removed that old code once the real logo was added.
   Date: Sept 20, 2026
   Commit: https://kensho18.github.io/DropHub/

3. What it gave us: A Google sign-in button that depends on a script loading from Google. If that script doesn't load in time, or isn't set up yet, nothing happens — no error, no message, just nothing.
   What was wrong: A visitor would just see no Google button and no explanation why, which is confusing.
   What we did instead: We kept the regular username/password login as a backup that always works, and we wrote down clearly that the Google button needs a real Google Client ID before it will work at all.
   Date: Sept 16, 2026
   Commit: https://kensho18.github.io/DropHub/



 3. Who wrote what
(this part is per person  30 points each. Name a real part of the site you wrote yourself, the file, the commit, and explain it in your own words. Then do the same for one AI-written part you understand the best.)

 liightsukii

Parts I wrote myself:

1. File: script.js 
   Commit: https://kensho18.github.io/DropHub/
   What it does: Keeps one object of on/off settings (notifications, drag-and-drop, permissions, privacy) saved in localStorage. Any button with a data-setting attribute reads and flips its matching value,
and every other part of the app checks getToggle("name") before it acts  so turning a setting off actually changes real behavior, not just a switch that looks pressed.
   
   Why I built it this way: I wanted one single place that owns all the settings instead of a separate variable for each one, so adding a new setting later just means adding one line to TOGGLE_DEFAULTS and one button in the HTML with the matching data-setting name, instead of writing new JavaScript every time.

2. File: script.js 
   Commit: https://kensho18.github.io/DropHub/
   What it does: When a file is uploaded, its actual file data is saved into the browser's IndexedDB (not just its name), and a small record (name, size, type, time) is saved to localStorage. The Home page reads that record list, shows the 10 most recent uploads with a "x minutes ago" time, and lets you download the real file back out or copy its contents, using the saved IndexedDB data.
   
   Why I built it this way: localStorage can only hold text, not actual files, so I used IndexedDB alongside it — localStorage for the small list info that's cheap to read often, and IndexedDB for the heavier file data that's only read when someone clicks Download or Copy.

3. File: index.html + script.js 
   Commit: https://kensho18.github.io/DropHub/
   
   What it does: Lets you change your display name, change your password (checking all three boxes are filled, the new password is at least 6 characters, and both new-password boxes match before accepting it), and link/unlink Google as a provider — all stored and read back from localStorage.
   
   Why I built it this way: I kept the password check as simple client-side validation with clear error messages, since there's no real backend yet to check against  the goal was to show the right kind of error for each specific mistake (empty box vs. too short vs. mismatched), not just one generic error.

AI-written code I understand best:
- File: script.js
  
- Commit: https://kensho18.github.io/DropHub/
  
- What it does: Loops through every .view section and every nav button, and turns on the active class only for the one matching the page name that was clicked  that's what makes the site switch "pages" without actually reloading anything. It also calls renderRecent() when switching to Home and showAccountName() when switching to Profile, so those pages always show fresh data.
  
- Why we kept it: It's a simple, reusable pattern — any new page I add later just needs a section with a matching id="view-name" and a nav button with data-view="name", and this function already knows how to handle it without being changed.

(If there are other teammates: each person copies the ### yourgithubname heading above and fills in their own parts.)


