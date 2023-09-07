---
title: About the Authors
layout: page
order: 303
outputs: [pdf, epub]
---

{% for author in publication.contributor %}
  {{ author.bio | markdownify }}
{% endfor %}
