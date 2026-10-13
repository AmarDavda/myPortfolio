# What was added (Home + Sidebar untouched)

src/app/shared/            theme.css, page.css, slider/, page-navbar/, footer/, back-to-top/,
                           page-base.ts, slider-state.ts, portfolio.model.ts, portfolio.service.ts
src/app/components/about|skill|project|contact/   new pages (ts/html/css)
src/app/app.routes.ts      /skill /project /contact enabled
src/app/app.config.ts      provideHttpClient(withFetch()) added (needed to read the JSON)
public/data/portfolio.json all page data (edit this file to change content)

Project links: set "github", "demo", "pdf" and "image" per project in portfolio.json
(image/pdf paths like "assets/projects/xyz.jpg"); empty values show a disabled button / pattern.
Social links: fill contact.socials[].link, empty ones are hidden.

If `ng build` warns about component style size, raise "anyComponentStyle" budget in angular.json
(home.css is already large, so yours is probably raised).

## Round 2 changes
- Home: experience section now shows the timeline from portfolio.json (project cards slider removed);
  footer replaced by the shared <app-footer>; resume link fixed to assets/resume/myResume.pdf.
- Footer "Get In Touch" button now opens the Contact page (/contact) everywhere.
- Project page: Experience section removed (lives on Home).
- Sidebar bottom icons read their links from portfolio.json
  (Email, WhatsApp, Address work now; set contact.socials[GitHub|LinkedIn].link to show those two icons).

## Round 3 fixes
- Home: section refs now use read: ElementRef (the shared footer is a component, so it never got the 'visible' class and stayed hidden);
  experience section has its old roomy layout back and fits at 480px; footer container fits its parent at every width.
- Sidebar: social row keeps its height so Dev Status doesn't jump.
- Skill cards: transparent themed cards, no background letters, glow + hover name/level slide.
