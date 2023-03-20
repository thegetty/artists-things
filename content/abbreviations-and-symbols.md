---
title: Abbreviations & Symbols
layout: page
order: 11
---

## Abbreviations

<table id="abbreviations">
<thead>
  <tr><td>Abbreviation</td><td>Full Reference </td><tr>
</thead>
<tbody>
{% for item in abbreviations.abbreviations_list %}
  <tr><td>{{ item.id | markdownify }}</td><td>{{ item.full | markdownify }}</td><tr>
{% endfor %}
</tbody>
</table>

## Author Symbols

§ Katie Scott

‡ Hannah Williams