# 🎙️ Podcast App

A dynamic podcast web app that displays podcasts, allows filtering by genre and update type, and provides detailed modals for each podcast. Built with vanilla JavaScript, using import/export modules, dynamic DOM rendering, and helper functions for clean, modular code. 

## Features  

### 1. Render Podcasts
- Data Linking: Combines three separate objects (podcasts, genres, seasons) into a single linkedData object for each podcast.
- Custom Web Component: Each podcast is now encapsulated in a web component (`<podcast-list>`) which handles rendering its own markup, shadow DOM (if used), styling, and events.  
- Dynamic DOM Rendering: Podcasts are rendered dynamically to the DOM using template strings.
- Data includes:
    - Title
    - Image
    - Genres
    - Season number
    - Last updated date (formatted)

### 2. Filter Podcasts
- Users can filter podcasts by Genre or Update type.
- Genres dropdown is dynamically populated from the genres array in data.js.
- Updates dropdown includes options:
    - Recently Updated
    - Most Popular
    - Newest
    - Filtering dynamically re-renders the podcasts without refreshing the page.

### 3. Dynamic Modal
- Clicking a podcast (or the podcast-card component) opens a modal showing detailed information.
- Modal data includes:
    - Title
    - Image
    - Description
    - Genres
    - Updated date (formatted)
    - Season details (list of seasons and episode counts)
    - Modal is dynamically created using template strings.
    - Closed by either the backdrop or the close icon.

### 4. Helper Functions
- ``linkPodcasts(podcasts, genres, seasons)``
- Combines the three separate datasets into a single structure for easier rendering.
- ``formatDate(isoDate)``
- Converts ISO date strings into human-readable formats like ``November 3, 2022``.

<br/>

###  File structure
```
/podcast-app
│
├─ index.html          # Main HTML file: includes where the web component is defined/used
├─ style.css           # Styles for layout, cards, filters, modal (plus any styles inside component if applicable)
├─ main.js             # Entry point: orchestrates rendering, filters, component definitions, modal

├─ data.js             # Hardcoded podcast, genres, and seasons data
├─ helper.js           # Helper functions: linkPodcasts(), formatDate(), etc.
├─ render.js           # New: Definition of custom web component for podcast cards
├─ modal.js            # Build dynamic modals for each podcast
├─ filterPodcast.js    # Filter functionality for genres and updates
└─ README.md           # Project documentation
```

<br/>

### 6. Rendering Flow

1. **Link Data**  
   Use `linkPodcasts()` to combine `podcasts`, `genres`, and `seasons` into unified objects.

2. **Define Web Component and Render Podcasts**  
   In `render.js` ,define a custom element (e.g. `<podcast-list>`) that renders a podcast’s data (image, title, etc.). It handles its own template and styling. For each podcast in linked data, instantiate a `<podcast-list>` component, assign its data (attributes or via property), and append to the container in the DOM.

3. **Setup Filters**  
   `filterPodcast.js` listens to dropdown changes (genre, update type), filters the linked data accordingly, then clears and re-renders component instances based on filtered list.

4. **Open Dynamic Modal**  
   In `modal.js`, when a user clicks on a podcast card (handled either via event delegation or via custom component emitting events), open a modal that shows more details.

<br>

### 9. Key Notes
- **Component Encapsulation** — Using a custom web component improves modularity and allows each podcast card to manage its own rendering logic and styles.  
- **Modular Design** — Each concern (data, rendering, component, modal, filtering) is separated into its own file and module.  
- **Dynamic Rendering** — No hardcoded podcast cards or filters in HTML; everything is generated from data.  
- **User Interaction** — Filters and modals update dynamically without page reloads.

<br>

#### License
This project is for educational use only.