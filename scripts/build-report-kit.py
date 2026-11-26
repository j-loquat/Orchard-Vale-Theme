#!/usr/bin/env python3
"""Refresh the standalone report kit and its downloadable ZIP."""

import argparse
import io
import re
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parent.parent
KIT = ROOT / "kits" / "orchard-research-report"
REPORT = ROOT / "demo" / "orchard-research-report.html"
THEME = ROOT / "src" / "theme"
ASSETS = ROOT / "src" / "assets" / "orchard-vale"
ZIP = KIT.with_suffix(".zip")
TEXT_SUFFIXES = {".css", ".html", ".js", ".md", ".svg"}


def read_file(path):
    if path.suffix in TEXT_SUFFIXES or path.name == "LICENSE":
        return path.read_text(encoding="utf-8").encode("utf-8")
    return path.read_bytes()


def standalone_example(template):
    masthead = re.search(r'  <header class="ov-demo-bar"[^>]*>.*?</header>', template, re.DOTALL)
    if masthead is None:
        raise ValueError("The editable template needs a standalone masthead.")
    example, nav_count = re.subn(
        r"  <nav\b[^>]*\bdata-ov-demo-bar\b[^>]*>.*?</nav>",
        lambda _: masthead.group(),
        REPORT.read_text(encoding="utf-8"),
        flags=re.DOTALL,
    )
    example, download_count = re.subn(
        r"^[ \t]*<a\b[^>]*\bdata-report-kit-download\b[^>]*>[^<]*</a>\n",
        "",
        example,
        flags=re.MULTILINE,
    )
    if nav_count != 1 or download_count != 1:
        raise ValueError("Expected one demo navigation bar and one kit download link.")
    return example.encode("utf-8")


def collect_files():
    template_path = Path("report/template.html")
    template = read_file(KIT / template_path)
    example = standalone_example(template.decode("utf-8"))
    theme_css = sorted(THEME.glob("*.css"))
    theme_paths = theme_css + [THEME / "orchard-vale.js"]
    report_css = REPORT.with_suffix(".css")
    report_paths = [report_css, REPORT.with_suffix(".js")]
    files = {
        Path("README.md"): read_file(KIT / "README.md"),
        Path("AGENTS.md"): read_file(KIT / "AGENTS.md"),
        Path("LICENSE"): read_file(ROOT / "LICENSE"),
        template_path: template,
        Path("report/example.html"): example,
    }
    files.update({path.relative_to(ROOT): read_file(path) for path in theme_paths})
    files.update({Path("report") / path.name: read_file(path) for path in report_paths})

    # Copy all local assets referenced by the bundled CSS and both report pages.
    assets = set()
    for path in theme_css + [report_css]:
        css = path.read_text(encoding="utf-8")
        matches = re.findall(r"""url\(\s*(?:"([^"]*)"|'([^']*)'|([^'")\s]+))\s*\)""", css)
        for match in matches:
            reference = next(part for part in match if part)
            if not reference.startswith("data:"):
                assets.add((path.parent / reference).resolve())
    for html in (template, example):
        references = re.findall(r'\bsrc="\.\./(src/assets/orchard-vale/[^"]+)"', html.decode("utf-8"))
        assets.update((ROOT / reference).resolve() for reference in references)
    for path in sorted(assets):
        if ASSETS not in path.parents:
            raise ValueError(f"Report asset is outside the bundle's asset tree: {path}")
        files[path.relative_to(ROOT)] = read_file(path)
    return files


def archive_members(files):
    return {f"{KIT.name}/{path.as_posix()}": files[path] for path in sorted(files)}


def build(files):
    for relative, content in files.items():
        target = KIT / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        if not target.is_file() or read_file(target) != content:
            target.write_bytes(content)

    buffer = io.BytesIO()
    with ZipFile(buffer, "w") as archive:
        for name, content in archive_members(files).items():
            info = ZipInfo(name)
            info.external_attr = 0o100644 << 16
            archive.writestr(info, content, compress_type=ZIP_DEFLATED, compresslevel=9)
    ZIP.write_bytes(buffer.getvalue())


def check(files):
    for relative, content in files.items():
        target = KIT / relative
        if not target.is_file() or read_file(target) != content:
            raise SystemExit(f"Report kit file is missing or stale: {relative.as_posix()}")
    if not ZIP.is_file():
        raise SystemExit("The report kit ZIP is missing.")
    with ZipFile(ZIP) as archive:
        expected = archive_members(files)
        if archive.namelist() != list(expected) or any(
            archive.read(name) != content for name, content in expected.items()
        ):
            raise SystemExit("The report kit ZIP is stale.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check the bundle without writing files.")
    args = parser.parse_args()
    files = collect_files()
    if not args.check:
        build(files)
    check(files)
    print(f"Report kit verified: {len(files)} files, {ZIP.stat().st_size:,} ZIP bytes.")


if __name__ == "__main__":
    main()
