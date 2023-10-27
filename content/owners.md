---
title: List of Owners
layout: page
order: 10
---

{% assign thingPages = collections.thing %}

{% assign thingOwners = '' %}
{% for thing in thingPages %}
{% for entity in thing.data.object[0].owner %}
{% capture thisThingsOwners %}{% if entity.full_name %}{{ entity.full_name }}{% else %}{{ entity.last_name }}, {{ entity.first_name }}{% endif %}{% endcapture %}
{% assign thingOwners = thingOwners | concat: thisThingsOwners %}
{% endfor %}
{% endfor %}

{% assign uniqueThingOwners = thingOwners | uniq | sort %}

<ul id="owners-list" class="has-rule-lines">
{% for owner in uniqueThingOwners %}
{% unless owner == '' %}
<li>{{ owner }} ({% for page in thingPages %}{% assign checkThingOwners = '' %}{% for entity in page.data.object[0].owner %}{% capture checkThisThingsOwners %}{% if entity.full_name %}{{ entity.full_name }}{% else %}{{ entity.last_name }}, {{ entity.first_name }}{% endif %}{% endcapture %}{% assign checkThingOwners = checkThingOwners | concat: checkThisThingsOwners %}{% endfor %}{% if checkThingOwners contains owner %}{% assign thingOwned = page.data.title | downcase %}{% thing thingOwned %}{% endif %}{% endfor %})</li>
{% endunless %}
{% endfor %}
</ul>