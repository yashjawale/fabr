---
title: Templates
description: Build repository templates that fabr can customize.
---

Fabr downloads a template repository and copies its files into a new project. Add an optional `fabr.config.json` at the repository root to customize setup.

The configuration supports four things:

- Replace `{{KEY}}` tokens in file contents with prompted values.
- Rename explicitly listed files, optionally using placeholder values in paths.
- Prompt for environment variables and create `.env` or `.env.local`.
- Run a command before or after template processing.

See the [configuration reference](/docs/templates/configuration) for the schema and examples. Templates can also be listed in the project's [`templates.json`](https://github.com/yashjawale/fabr/blob/main/templates.json).
