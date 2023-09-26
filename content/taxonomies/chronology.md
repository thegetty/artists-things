---
title: Chronology by Artist
layout: page
order: 201
class: taxonomy
---

{% capture tableRows %}
{%- for page in collections.thing -%}
{%- for entity in page.data.owner -%}
{%- if entity.sort_years or entity.years -%}
  <tr data-sort-as="{% if entity.sort_years %}{{ entity.sort_years }}{% else %}{{ entity.years }}{% endif %}">
    <td>{{ entity.years }}</td>
    <td>{% if entity.full_name %}{{ entity.full_name }}{% else %}{{ entity.first_name }} {{ entity.last_name }}{% endif %}</td>
  </tr>||
{%- endif -%}
{%- endfor -%}
{%- endfor -%}
{%- endcapture -%}

{% assign tableRowsArray = tableRows | split: "||" | uniq %}

<div class="has-rule-lines">
<table class="taxonomy-table" id="artists-chronology">
  <thead class="visually-hidden">
    <tr><th>Years</th><th>Artist</th>
  </thead>
  <tbody>
    {{ tableRowsArray | sort }}
  </tbody>
</table>
</div>
