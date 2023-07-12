0.6: New note in Single page app diagram

```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created {message: "note created"}
    deactivate server
    Note right of browser: Page handles note submission by creating new note,<br> adding it to note list, rerendering note list and <br> sending post request to the server to create note on server 
```