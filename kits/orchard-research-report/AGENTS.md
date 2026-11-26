# Create an Orchard Vale research report

Use [report/template.html](report/template.html) as the editable starting point and [report/example.html](report/example.html) as the visual reference. Save a new HTML file inside `report/` so the paths to the styles, scripts, and artwork resolve. Choose the filename the user requests.

## Apply the format

1. Replace the title, metadata, summary chips, and bracketed fields with material from the user's draft, notes, or sources. Set the source count from the final list. Use a confidence label supported by the evidence.
2. Keep the report shell, owl header, typography, component classes, and linked CSS and JavaScript. Preserve the section order for a full research report.
3. Use the sections as follows.

   | Section | Content |
   | --- | --- |
   | Key Takeaways | The few points the reader needs first |
   | Short Answer | The bottom line, with confirmed, inferred, and watch callouts where useful |
   | Findings | The evidence and its interpretation, with a comparison table when it helps |
   | Practical Implications | What the findings mean and any supported next step |
   | Confidence and Gaps | What is well supported, what depends on context, and what could not be verified |
   | Sources | The sources actually used, with usable links when supplied and matching citation text for the copy buttons |

4. Adapt rows, cards, and callouts to the evidence. If a section is omitted, remove its matching navigation link. Keep each remaining link's fragment, section ID, and heading reference consistent.
5. Resolve bracketed fields before handing over the report. Use an explicit gap when the evidence is incomplete. Include source claims and links only when the supplied material or authorized research supports them.

## Verify the HTML

- Open the finished report from disk. Check the desktop and mobile layouts and confirm the artwork loads from the kit.
- Check that section links land on their headings and that the highlighted section updates when you scroll. Keep `id="report-nav"` for this behavior.
- Check that each **Copy citation** button copies the corresponding source citation and URL when provided. Set its `data-ov-copy` value to that citation.
- Check **Print / Export PDF** in print preview. Keep `id="print-report-btn"` and the `data-ov-print-hide` attributes on the controls.
