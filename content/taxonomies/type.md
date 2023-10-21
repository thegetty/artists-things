---
title: Index by Type of Thing
layout: page
order: 202
classes: 
  - taxonomy
---

{% assign thingPages = collections.thing %}

{% assign thingTypes = '' %}
{% for thing in thingPages %}
{% assign thisThingsTypes = thing.data.type %}
{% assign thingTypes = thingTypes | concat: thisThingsTypes %}
{% endfor %}

{% assign uniqueThingTypes = thingTypes | uniq | sort %}

<div class="has-rule-lines">
<table class="taxonomy-table" id="index-by-thing">
  <thead class="visually-hidden">
    <tr><th>Type</th><th>Thing</th>
  </thead>
  <tbody>
{% for type in uniqueThingTypes %}
{% unless type == '' %}
<tr>
<td>{{ type }}</td>
<td>{% for page in thingPages %}{% if page.data.type contains type %}{% thing page.data.title %} {% endif %}{% endfor %}</td>
</tr>
{% endunless %}
{% endfor %}
<tbody>
</table>
</div>