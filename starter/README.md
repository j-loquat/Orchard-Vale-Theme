# Set up Orchard Vale

Use the [setup guide](index.html) to create a working HTML page or to theme a section of an existing site. The guide includes complete starter HTML, a test dialog, and a prompt for coding assistants.

## Create a new page

1. Copy `src/theme/` and `src/assets/orchard-vale/` from the kit into your project. Preserve the paths below so the stylesheet can load its assets.

   ```text
   your-project/
     index.html
     src/
       theme/
       assets/
         orchard-vale/
   ```

2. In the [setup guide](index.html#new-page), select **Copy starter HTML**. Save the result as `index.html` next to `src/`. Expand **View starter HTML** to copy the code manually.

3. Open `index.html` in a browser. Verify that the panel looks like parchment against a dark wood background. Select **Test the dialog** and press **Esc** to close it.

If the page looks unstyled, check the path from `index.html` to `src/theme/index.css`. If the page is styled and the dialog stays closed, check the JavaScript path.

## Theme an existing page

1. Copy the same two folders into the project.
2. Add the stylesheet link to the HTML head. For pages next to `src/`, use the path in the example. Adjust the path for pages in other folders or for your app's asset pipeline.

   ```html
   <link rel="stylesheet" href="src/theme/index.css">
   ```

3. Add `class="ov-theme"` to the page body for a full-page theme or to a wrapper around the section you want to theme.
4. Apply Orchard Vale classes to your page. Start with `ov-panel` for parchment content. Use the [design guide](../docs/design.md) to choose components and [Component Examples](../demo/asset-pattern-library.html#recipes) to see how they work.
5. If the page uses the kit's tabs, dialogs, or clipboard controls, add the helper script to the HTML head.

   ```html
   <script src="src/theme/orchard-vale.js" defer></script>
   ```

6. Open the page at desktop and mobile widths. Check that the page fits, referenced assets load, and existing controls still work.

## Set up with a coding assistant

Give the assistant access to this kit and your project. In the [setup guide](index.html#ai-assistants), select **Copy AI setup request** and specify the page or feature to theme. The request points the assistant to the [design guide](../docs/design.md) and asks it to preserve the existing workflow and verify the result.
