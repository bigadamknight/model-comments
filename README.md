# Model Comments

Model Comments is a Visual Studio Code extension that allows you to show and hide comments specifically intended for Large Language Models (LLMs).

## Features

- Toggle visibility of LLM-specific comments
- Customizable comment identifier
- Status bar indicator for current visibility state
- Keyboard shortcut for quick toggling

## Usage

1. Add LLM-specific comments to your code using the configured identifier (default is "LLM:"):
   ```
   // LLM: This comment is for language models
   ```

2. Use the command palette (Ctrl+Shift+P or Cmd+Shift+P) and search for "Toggle LLM Comments" to show/hide these comments.

3. Alternatively, use the keyboard shortcut Ctrl+Alt+L (Cmd+Alt+L on Mac) to toggle comment visibility.

4. The current visibility state is shown in the status bar.

## Extension Settings

This extension contributes the following settings:

* `modelComments.identifier`: Set the identifier for LLM comments (default: "LLM:")
* `modelComments.defaultState`: Set the default visibility state ("show" or "hide")

## Known Issues

[List any known issues here, or remove this section if there are none]

## Release Notes

### 0.0.1

Initial release of Model Comments

---

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
