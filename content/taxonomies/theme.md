---
title: Index by Theme
layout: page
order: 203
---

{% assign thingPages = collections.thing %}

{% assign thingThemes = '' %}
{% for thing in thingPages %}
{% assign thisThingsThemes = thing.data.theme %}
{% assign thingThemes = thingThemes | concat: thisThingsThemes %}
{% endfor %}

{% assign uniqueThingThemes = thingThemes | uniq | sort %}

<table class="taxonomy-table" id="index-by-theme">
  <thead class="visually-hidden">
    <tr><th>Type</th><th>Theme</th>
  </thead>
  <tbody>
{% for theme in uniqueThingThemes %}
<tr>
<td>{{ theme }}</td>
<td>{% for page in thingPages %}{% if page.data.theme contains theme %}{% thing page.data.title %} {% endif %}{% endfor %}</td>
</tr>
{% endfor %}
<tbody>
</table>