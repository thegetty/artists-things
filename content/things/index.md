---
title: "Things"
layout: splash
order: 100
redirect: "/contents/"
---

{% assign thingPages = collections.thing %}

<div class="pdf-thing-grid is-print-only">{%- for thing in thingPages -%}<div class="pdf-thing-grid__item">
<a href="#things-{{ thing.fileSlug }}">
<span class="pdf-thing-grid__item__title">{{ thing.data.title | markdownify }}</span>
<img class="pdf-thing-grid__item__thumbnail" src="_assets/images/figures/things/{{ thing.fileSlug }}.jpg" />
</a>
</div>{%- endfor -%}</div>
