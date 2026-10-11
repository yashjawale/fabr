---
title: Adding templates
description: Create a repository template that works with or without fabr.
---

Fabr scaffolds projects from repositories. A template should be useful on its own; `fabr.config.json` is optional and adds prompts, file renames, environment files, and pre/post setup commands.

## Create a template repository

1. Create a repository with the starter project files and a README explaining how to use them.
2. Keep all filenames valid for ordinary use without Fabr. Use `renamedFiles` when Fabr should customize a filename; for example, map `plugin.php` to `{{PLUGIN_SLUG}}.php`.
3. If customization is useful, add `fabr.config.json` to the repository root. See the [configuration reference](/docs/templates/configuration) and the [example config](https://github.com/yashjawale/fabr/blob/main/example.fabr.config.json).
4. Test both the template itself and its Fabr setup:

   ```sh
   npx fabr init test-plugin --template=https://github.com/yourname/your-template
   ```

## Add it to the official template list

Open a pull request adding an entry to the root [`templates.json`](https://github.com/yashjawale/fabr/blob/main/templates.json). Each entry has a display name, lowercase slug, and repository:

```json
{
  "name": "WordPress Plugin Starter",
  "slug": "wordpress-plugin",
  "repo": "yourname/wordpress-plugin"
}
```

Keep the pull request focused and include a link to the template repository. Ensure the repository is public, has a clear README, and contains no secrets.
