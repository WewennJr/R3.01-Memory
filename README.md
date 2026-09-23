# R3.01 — Memory Game ([view the production](./index.html))

Memory game created as part of the **R3.01 Web Development** course. The
player must find all pairs of cards in as few moves as possible and in the shortest time.

## Technologies

- **Vanilla JavaScript ES6**: game logic, event handling, and DOM updates without a framework.
- **CSS Grid**: responsive organization of the card grid.
- **HTML5 / CSS3**: structure, styling, and accessible interface.

## Features

- Pair detection and move counting.
- Random card shuffling using the **Fisher-Yates** algorithm.
- Accessible interface with **ARIA** roles and attributes, as well as keyboard controls.
- **Asynchronous** handling to orchestrate animations and the delay between two cards.
- Timer and end screen when all pairs have been found.

## Local setup

1. Clone or download the project.
2. Open a terminal at the root of the `Memory` folder.
3. Start a local HTTP server, for example:

	```bash
	python3 -m http.server 8000
	```

4. Open [http://localhost:8000](http://localhost:8000) in your browser.

The project can also be opened directly with `index.html`, but a local server is recommended to ensure that resources work correctly.

### Deployment with GitHub Pages

1. Push the project to a GitHub repository.
2. Open the repository's **Settings** and select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing the project (usually `main`) and the `/ (root)` folder, then click **Save**.
5. Wait for the deployment, then open the URL provided by GitHub Pages.
