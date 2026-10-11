---
title: Template configuration
description: Configure file replacement, file renaming, environment files, and setup commands.
---

Add an optional `fabr.config.json` to the root of a template repository. It supports four operations: replacing `{{KEY}}` tokens in file contents, explicitly renaming files, generating `.env`/`.env.local`, and running a command before or after setup.

```json
{
  "$schema": "https://raw.githubusercontent.com/yashjawale/fabr/main/fabr.config.schema.json",
  "preSetupCommand": "echo 'Preparing project'",
  "placeholders": [
    { "key": "PROJECT_NAME", "prompt": "Project name?" }
  ],
  "renamedFiles": [
    { "from": "package.template.json", "to": "package.json" },
    { "from": "src/{{PROJECT_NAME}}.ts", "to": "src/app.ts" }
  ],
  "environmentVariables": [
    { "key": "API_KEY", "prompt": "API key?", "local": true }
  ],
  "postSetupCommand": "npm install"
}
```

## Properties

- `placeholders`: prompt for each `key` and replace matching `{{KEY}}` tokens in template file contents. An optional `default` pre-fills the answer.
- `renamedFiles`: explicit `{ "from", "to" }` paths relative to the project root. Keep the source filename valid and usable without Fabr; use `{{KEY}}` tokens in the destination path to customize it. Both paths must stay inside the project.
- `environmentVariables`: write prompted or default values to `.env`; set `local: true` to write to `.env.local` instead.
- `preSetupCommand` and `postSetupCommand`: optional shell commands run before and after file/environment processing.

All properties are optional. If you don't need customization or setup commands, omit `fabr.config.json`.
