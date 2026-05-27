#!/usr/bin/env python3
"""
Run this script in the same directory as your index.html.
It replaces the partner network section with the updated version.
"""
import re

with open('index.html', 'r') as f:
    html = f.read()

with open('partners_section.html', 'r') as f:
    new_section = f.read()

# Replace from <section id="partners"> through its closing </section>
# (the </section> immediately before <section id="certifications">)
pattern = r'<section id="partners">.*?</section>(?=\s*<section id="certifications">)'
result = re.sub(pattern, new_section, html, flags=re.DOTALL)

if result == html:
    print("ERROR: Pattern not found. Check that your index.html has the partners section.")
else:
    with open('index.html', 'w') as f:
        f.write(result)
    print("Success! index.html updated.")
