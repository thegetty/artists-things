---
title: Contents
layout: objects-page
order: 5
search: false
menu: false
---

{% assign thingPages = collections.thing %}

<div class="pdf-thing-grid is-print-only">{%- for thing in thingPages -%}<div class="pdf-thing-grid__item">
<a href="#things-{{ thing.fileSlug }}">
<span class="pdf-thing-grid__item__title">{{ thing.data.title | markdownify }}</span>
<img class="pdf-thing-grid__item__thumbnail" src="_assets/images/figures/things/{{ thing.fileSlug }}.jpg" />
</a>
</div>{%- endfor -%}</div>

<nav class="table-of-contents menu-list" data-outputs-include="html">
  <ol class="table-of-contents-list">
    <li class="level-0 page-item">
      <a href="/owners/"><span class="page-item-title">List of Owners</span></a>
    </li>
    <li class="level-0 page-item">
      <a href="/abbreviations-and-symbols/"><span class="page-item-title">Abbreviations &amp; Symbols</span></a>
    </li>
    <li class="level-0 page-item">
      <a href="/intro/"><span class="page-item-title">Introduction</span></a>
    </li>
    <li class="level-0 section-item">
      <span class="page-item-title">Things</span>
    </li>
    <li class="level-0 section-item">
      <a href="/taxonomies/"><span class="page-item-title">Taxonomies</span></a>
      <ol class="table-of-contents-list">
        <li class="level-1 page-item">
          <a href="/taxonomies/chronology/"><span class="page-item-title">Chronology by Artist</span></a>
        </li>
        <li class="level-1 page-item">
          <a href="/taxonomies/type/"><span class="page-item-title">Index by Type of Thing</span></a>
        </li>
        <li class="level-1 page-item">
          <a href="/taxonomies/theme/"><span class="page-item-title">Index by Theme</span></a>
        </li>
        <li class="level-1 page-item">
          <a href="/taxonomies/material/"><span class="page-item-title">Index by Material</span></a>
        </li>
      </ol>
    </li>
    <li class="level-0 page-item">
      <a href="/further-reading/"><span class="page-item-title">Further Reading on Things</span></a>
    </li>
    <li class="level-0 page-item">
      <a href="/acknowledgements/"><span class="page-item-title">Acknowledgments</span></a>
    </li>
    <li class="level-0 page-item">
      <a href="/about/"><span class="page-item-title">About</span></a>
    </li>
  </ol>
</nav>