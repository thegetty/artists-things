---
title: Index by Material
layout: page
order: 204
classes: 
  - taxonomy
---

{% assign thingPages = collections.thing %}

{% assign thingMaterials = '' %}
{% for thing in thingPages %}
{% assign thisThingsMaterials = thing.data.object[0].material %}
{% assign thingMaterials = thingMaterials | concat: thisThingsMaterials %}
{% endfor %}

{% assign uniqueThingMaterials = thingMaterials | uniq | sort %}

<table class="taxonomy-table" id="materials-table">
  <thead class="visually-hidden">
    <tr><th>Material</th><th>Thing</th>
  </thead>
  <tbody>
{% assign lastMaterialCategory = '' %}
{% for material in uniqueThingMaterials %}

{% assign materialCategory = material | split: " | " | first %}
{% assign materialName = material | split: " | " | last %}
{% assign materialFullName = material %}
{% assign materialCategorySize = materialCategory | size %}


{% if materialCategory != lastMaterialCategory %}
{% unless materialCategorySize == 0 %}
</tbody>
<tbody>
<tr data-size="{{ materialCategorySize }}" data-category="{{ materialCategory }}" data-last-category="{{ lastMaterialCategory }}">
<td class="material-category-header">{{ materialCategory }}</td>
<td data-outputs-exclude="epub,pdf">{% for page in thingPages %}{% assign pageTitle = page.data.title %}{% for item in page.data.object[0].material %}{% if item == materialCategory %}{% thing page.data.title %}{% endif %}{% endfor %}{% endfor %}</td>
<td data-outputs-exclude="html">{% for page in thingPages %}{% assign pageTitle = page.data.title %}{% for item in page.data.object[0].material %}{% if item == materialCategory %}<a href="{{ page.url }}">{{ page.data.title | markdownify }}</a>{% endif %}{% endfor %}{% endfor %}</td>
</tr>
{% assign lastMaterialCategory = materialCategory %}
{% endunless %}
{% endif %}

{% if materialCategory != materialName %}
<tr class="material-category" data-outputs-exclude="epub,pdf">
<td><a href="/contents/?material={{ materialCategory | replace: " ", "%2520" }}%2520%257C%2520{{ materialName | url_encode | replace: "+", "%2520" }}">{{ materialName}}</a></td>
<td>{% for page in thingPages %}{% assign pageTitle = page.data.title %}{% for item in page.data.object[0].material %}{% if item == materialFullName %}{% thing page.data.title %}{% endif %}{% endfor %}{% endfor %}</td>
</tr>
<tr class="material-category" data-outputs-exclude="html">
<td data-outputs-exclude="html">{{ materialName}}</td>
<td>{% for page in thingPages %}{% assign pageTitle = page.data.title %}{% for item in page.data.object[0].material %}{% if item == materialFullName %}<a href="{{ page.url }}">{{ page.data.title | markdownify }}</a>{% endif %}{% endfor %}{% endfor %}</td>
</tr>

{% endif %}

{% endfor %}
</tbody>
</table>