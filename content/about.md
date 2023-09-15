---
title: About
layout: page
class: backmatter about-copyright-page
order: 304
outputs: [html]
---

{{ publication.description.full }}



{% backmatter %}

## About the Authors

{% for author in publication.contributor  %}
  {{ author.bio | markdownify }}
{% endfor %}

<div class="citation-info">

## Citation Information

### Chicago

{% citation context='publication', type='chicago' %}

### MLA

{% citation context='publication', type='mla' %}

### Permanent URL

{{ publication.url }}

</div>
<div class="revision-history">

## Revision History

{{ publication.revision_statement | markdownify }}

{% for revision in publication.revision_history %}

### {{ revision.date }}

{% for item in revision.summary %}
- {{ item | markdownify }}
{% endfor %}

{% endfor %}

</div>
<div class="other-formats">

## Other Formats

{% for link in publication.resource_link %}
{% if link.type == "other-format" %}
- [{{ link.name }}]({{ link.url }})
{% endif %}
{% endfor %}

</div>
<div class="copyright">

## Copyright

{{ config.quire_credit_line | markdownify }}

{% copyright %}

</div>
<div class="publisher">

**Getty Research Institute Publications Program**
Mary E. Miller, *Director, Getty Research Institute*

{% for press in publication.publisher %}
{{ press.address | markdownify }}
{% endfor %}

</div>
<div class="project-team">

{% for person in publication.project_team %}
- {{ person | markdownify }}
{% endfor %}

</div>
<div class="cip-data">

{{ publication.library_of_congress_cip | markdownify }}

</div>
<div class="cover-image-credits">

Every effort has been made to contact the owners and photographers of illustrations reproduced here whose names do not appear in the captions. Anyone having further information concerning copyright holders is asked to contact Getty Publications so this information can be included in future printings.

This publication was peer reviewed through a single-masked process in which the reviewers remained anonymous.

Front cover: Double-hinged wig spectacles, ca. 1795. White metal frame and glass lenses, 38 mm (eye). London, British Optical Association Museum, College of Optometrists, inv. 1998.235.

</div>

{% endbackmatter %}


