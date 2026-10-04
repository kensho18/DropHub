HOW I USED AI (at least 6 entries, 35 points)

Entry 1
Date: Sept 3, 2026
Tool: Claude 
We asked for: A style.css to match our script.js (login form, menu, drop zone, file list, pop-up message).
It gave us: A full style sheet for all of those parts.
Kept/changed: We used it at first, but we had to rewrite it after we built the real HTML.
Commit: https://kensho18.github.io/DropHub/

Entry 2
Date: Sept 6, 2026
Tool: Claude 
We asked for: A login form that really works, not just one that looks nice.
It gave us: An index.html with a login form. It shows an error if a box is empty and shows the menu after login.
Kept/changed: We kept it. Later we added one line to hide the login form after login, because the AI forgot that.
Commit: https://kensho18.github.io/DropHub/

Entry 3
Date: Sept 9, 2026
Tool: Claude (Claude.ai)
We asked for: Black and orange colors for the site.
It gave us: A new style.css that uses color variables (like --bg and --orange).
Kept/changed: We kept it as is. The variables make it easy to change colors later.
Commit: https://kensho18.github.io/DropHub/

Entry 4
Date: Sept 13, 2026
Tool: Gemini
We asked for: Remove the Admin Settings page, make the drop area clearer, and add "week 2" features.
It gave us: No Admin page, a clearer drop zone with an icon and text, a file count/size summary, a Clear All button, and a progress bar for uplds.
Kept/changed: We kept everything.
Commit: https://kensho18.github.io/DropHub/

Entry 5
Date: Sept 16, 2026
Tool: Gemini
We asked for: A Google sign-in option.
It gave us: A Google sign-in button next to the normal login form, using Google's official script.
Kept/changed: We kept it. It still needs a real Google Client ID, and we have to get that ourselves (see Part 2).
Commit: https://kensho18.github.io/DropHub/

Entry 6
Date: Sept 20, 2026
Tool: chat gpt
We asked for: Remove the "Group members" placeholder, make the DropHub name look like a real logo, and add more to the Home page.
It gave us: A logo (icon plus colored text) and a Home page with a short intro, three feature cards, and a button to the Storage Manager.
Kept/changed: We kept it all. We also removed old code that would have broken the logo (see Part 2).
Commit: https://kensho18.github.io/DropHub/

Entry 7
Date: Sept 24, 2026
Tool: Claude 
We asked for: A Settings page with a light/dark switch, plus anything else useful.
It gave us: A Settings page with a light/dark toggle, 4 accent colors, a short how-to guide, and a reset button. It remembers your choices.
Kept/changed: We kept all of it.
Commit: https://kensho18.github.io/DropHub/

Entry 8
Date: Sept 28, 2026
Tool: Gemini
We asked for: README.md and REPORT.md, then simpler wording a few times.
It gave us: Full drafts of both files, rewritten in simple, casual English.
Kept/changed: We kept them and updated them whenever the site changed.
Commit: https://kensho18.github.io/DropHub/


WHERE THE AI GOT IT WRONG (3 real cases, 25 points)

Case 1
Date: Sept 3, 2026
What it gave us: A style.css written for HTML the AI only guessed we had.
What was wrong: Our real index.html was just a plain starter file, so none of the styles worked.
What we did instead: We had the AI rebuild index.html to match the CSS and JS.
Commit: https://kensho18.github.io/DropHub/

Case 2
Date: Sept 20, 2026
What it gave us: Code that reset the header to plain "DropHub" text on every login.
What was wrong: We later added a logo in that spot, and this code would have deleted it each time someone logged in.
What we did instead: We removed the old code.
Commit: https://kensho18.github.io/DropHub/

Case 3
Date: Sept 16, 2026
What it gave us: A Google sign-in button that needs a script from Google to load.
What was wrong: If the script does not load or is not set up, nothing happens. There is no error and no message, so visitors get confused.
What we did instead: We kept the normal username/password login as a backup that always works, and we wrote down that the Google button needs a real Google Client ID.
Commit: https://kensho18.github.io/DropHub/


WHO WROTE WHAT (per person, 30 points each)

liightsukii/
kensho18/
hans-again/
Victorwembanyama1

Parts we wrote as a group

liightsukii/kenso18
1. Settings toggles
File: script.js
Commit: https://kensho18.github.io/DropHub/
What it does: It keeps one object of on/off settings (notifications, drag-and-drop, permissions, privacy) in localStorage. Any button with a data-setting attribute flips its matching setting. The rest of the app checks getToggle("name") before it acts, so turning a setting off really changes what the app does.
Why I built it this way: I wanted one place to control all settings. To add a new one, I only add one line to TOGGLE_DEFAULTS and one button in the HTML. I do not need to write new JavaScript.


liightsukii/kensho18

2. File storage and recent uploads
File: script.js
Commit: https://kensho18.github.io/DropHub/
What it does: When you upload a file, the real file data goes into IndexedDB. A small record (name, size, type, time) goes into localStorage. The Home page shows the 10 most recent uploads with a "x minutes ago" time. You can download the file or copy its contents.
Why I built it this way: localStorage can only hold text, not files. So I use localStorage for the small list, which is quick to read, and IndexedDB for the big file data, which is only read when someone clicks Download or Copy.


hans-again/Victorwembanyama1

3. Profile page
File: index.html + script.js
Commit: https://kensho18.github.io/DropHub/
What it does: You can change your display name, change your password, and link or unlink Google. Everything is saved in localStorage. The password change checks that all three boxes are filled, the new password is at least 6 characters, and both new-password boxes match.
Why I built it this way: There is no real backend yet, so I kept it as simple checks in the browser. I wanted a clear error for each mistake (empty box, too short, not matching) instead of one general error.


hans-again/Victorwembanyama1

AI-written code I understand best
File: script.js
Commit: https://kensho18.github.io/DropHub/
What it does: It goes through every .view section and every nav button. It turns on the active class only for the page you clicked. This is how the site switches pages without reloading. It also calls renderRecent() when you open Home and showAccountName() when you open Profile, so those pages always show fresh data.
Why we kept it: It is simple and reusable. To add a new page, I only need a section with id="view-name" and a nav button with data-view="name". The function already works with it.


