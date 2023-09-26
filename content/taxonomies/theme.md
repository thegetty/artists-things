---
title: Index by Theme
layout: page
order: 203
class: taxonomy
---

{% assign thingPages = collections.thing %}

{% assign thingThemes = '' %}
{% for thing in thingPages %}
{% assign thisThingsThemes = thing.data.theme %}
{% assign thingThemes = thingThemes | concat: thisThingsThemes %}
{% endfor %}

{% assign uniqueThingThemes = thingThemes | uniq | sort %}

<div class="has-rule-lines">
<table class="taxonomy-table" id="index-by-theme">
  <thead class="visually-hidden">
    <tr><th>Type</th><th>Theme</th>
  </thead>
  <tbody>
{% for theme in uniqueThingThemes %}
{% unless theme == '' %}
<tr>
<td>{{ theme }}</td>
<td>{% for page in thingPages %}{% if page.data.theme contains theme %}{% thing page.data.title %} {% endif %}{% endfor %}</td>
</tr>
{% endunless %}
{% endfor %}
<tbody>
</table>
</div>