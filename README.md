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
