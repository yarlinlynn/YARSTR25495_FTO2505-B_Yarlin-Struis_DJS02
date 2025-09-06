# 🎙️ Podcast App

A dynamic podcast web app that displays podcasts, allows filtering by genre and update type, and provides detailed modals for each podcast. Built with vanilla JavaScript, using import/export modules, dynamic DOM rendering, and helper functions for clean, modular code. 

## Features  

### 1. Render Podcasts
- Data Linking: Combines three separate objects (podcasts, genres, seasons) into a single linkedData object for each podcast.
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
- Clicking a podcast opens a modal showing detailed information.
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
├─ index.html          # Main HTML file
├─ style.css           # Styles for layout, cards, filters, modal
├─ main.js             # Entry point: orchestrates rendering, filters, and modal
│
├─ data.js             # Hardcoded podcast, genres, and seasons data
├─ helper.js           # Helper functions: linkPodcasts(), formatDate(), etc.
├─ render.js           # Render podcasts to DOM using template strings
├─ modal.js            # Build dynamic modals for each podcast
├─ filterPodcast.js    # Filter functionality for genres and updates
└─ README.md           # Project documentation
```

<br/>

### 6. Rendering Flow
- Link Data: Use ``linkPodcasts()`` to combine podcasts, genres, and seasons.
- Render Podcasts: Use ``renderPodcasts()`` to display all podcasts in the DOM.
- Filter List: ``filterButtons()`` attaches event listeners to dropdowns to filter podcasts.
- Dynamic Modal: ``openModal()`` attaches event listeners to podcast cards for opening the modal.
- Helper Functions: ``formatDate()`` and other helpers provide consistent formatting.

<br/>

### 9. Key Notes
- Modular Design: Each feature (render, modal, filters) lives in its own module for clean, maintainable code (follows SOLID principles).
- Dynamic Rendering: All podcast data and filters are generated dynamically; no hardcoded podcast cards or options in HTML.
- Event Delegation: Modals and filters use event listeners attached at the container level to support dynamic content.
- Helper Functions: Ensure reusable code for linking datasets and formatting dates.

#### License
This project is for educational use only.