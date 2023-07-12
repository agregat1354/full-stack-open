0.4: New note diagram

```mermaid

sequenceDiagram
    participant browser
    participant server

    Note right of browser: note=test
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/
    activate server
    server-->>browser: redirect to /notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->browser: the js file
    deactivate server
    Note right of browser: The browser starts executing JavaScript code that fetches JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->browser: [{content: "test", date: "..."}, {...}]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

```