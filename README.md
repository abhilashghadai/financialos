## ER diagram

A visual ER diagram for the core domain model is available at `docs/er-diagram.svg` (and source at `docs/er-diagram.mmd`).

To regenerate/export to PNG locally using mermaid-cli:

```bash
# install mermaid-cli (requires Node.js)
npm install -g @mermaid-js/mermaid-cli
mmdc -i docs/er-diagram.mmd -o docs/er-diagram.png
```

Or paste the contents of `docs/er-diagram.mmd` into https://mermaid.live/ and export PNG/SVG.
