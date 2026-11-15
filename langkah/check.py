"""Pre-publish check: python3 check.py. Fails on broken internal links, missing anchors,
leftover placeholders (unless --draft), em dashes, trackers, and medical or therapy claims."""
import pathlib, re, sys

root = pathlib.Path(__file__).parent
pages = sorted(root.rglob("*.html"))
draft = "--draft" in sys.argv
banned = r"therap|terapi|autis|adhd|medical|medis|treat|diagnosed|cure|\bcookie banner\b"
allowed = ("no diagnosis", "a diagnosis, or any health", "diagnosis, atau informasi kesehatan")
problems = []

for page in pages:
    html = page.read_text()
    text = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    rel = page.relative_to(root)
    for target in re.findall(r'(?:href|src)="([^"]+)"', text):
        if target.startswith(("http", "mailto:", "#")):
            anchor = target[1:] if target.startswith("#") else None
            if anchor and f'id="{anchor}"' not in text:
                problems.append(f"{rel}: missing anchor #{anchor}")
            continue
        if target.startswith("/"):
            problems.append(f"{rel}: root-absolute link {target} breaks under /<repo>/")
            continue
        path = (page.parent / target.split("#")[0]).resolve()
        if path.is_dir():
            path = path / "index.html"
        if not path.exists():
            problems.append(f"{rel}: broken link {target}")
    if re.search("[–—]", text):
        problems.append(f"{rel}: em or en dash")
    if re.search(r"<script[^>]+src=\"http|gtag|analytics\.js|fonts\.googleapis", text):
        problems.append(f"{rel}: third-party request or tracker")
    body = text.lower()
    for ok in allowed:
        body = body.replace(ok, "")
    for hit in re.findall(banned, body):
        problems.append(f"{rel}: claim word '{hit}'")
    if "[SUPPORT EMAIL]" in text and not draft:
        problems.append(f"{rel}: [SUPPORT EMAIL] placeholder")

print("\n".join(problems) or f"OK: {len(pages)} pages")
sys.exit(1 if problems else 0)
