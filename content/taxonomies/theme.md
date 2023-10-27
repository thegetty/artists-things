---
title: Index by Theme
layout: page
order: 203
classes: 
  - taxonomy
---

{% assign thingPages = collections.thing %}

{% assign thingThemes = '' %}
{% for thing in thingPages %}
{% assign thisThingsThemes = thing.data.object[0].theme %}
{% assign thingThemes = thingThemes | concat: thisThingsThemes %}
{% endfor %}

{% assign uniqueThingThemes = thingThemes | uniq | sort %}

<div class="has-rule-lines">
<table class="taxonomy-table" id="themes-table">
  <thead class="visually-hidden">
    <tr><th>Type</th><th>Theme</th>
  </thead>
  <tbody>
{% for theme in uniqueThingThemes %}
{% unless theme == '' %}
<tr data-outputs-exclude="epub,pdf">
<td><a href="/contents/?theme={{ theme | url_encode | replace: "+", "%2520" }}">{{ theme }}</a></td>
<td>{% for page in thingPages %}{% if page.data.object[0].theme contains theme %}{% thing page.data.title %} {% endif %}{% endfor %}</td>
</tr>
<tr data-outputs-exclude="html">
<td>{{ theme }}</td>
<td>{% for page in thingPages %}{% if page.data.object[0].theme contains theme %}<a href="{{ page.url }}">{{ page.data.title | markdownify }}</a>{% endif %}{% endfor %}</td>
</tr>
{% endunless %}
{% endfor %}
</tbody>
</table>
</div>