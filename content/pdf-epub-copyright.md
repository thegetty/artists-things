---
title: Copyright Page
layout: page
classes: 
  - copyright-page 
  - about-copyright-page
order: 4
toc: false
menu: false
outputs:
  - pdf
  - epub
---

{{ config.quire_credit_line | markdownify }}

{{ publication.description.online_edition }}

{% copyright %}

First edition {{ publication.pub_date | date: "%Y" }}

{{ publication.revision_statement | markdownify }}

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
<div class="distribution">

Distributed in the United States and Canada by the University of Chicago Press

Distributed outside the United States and Canada by Yale University Press, London

</div>
<div class="cip-data">

{{ publication.library_of_congress_cip | markdownify }}

</div>
<div class="cover-image-credits">

Every effort has been made to contact the owners and photographers of illustrations reproduced here whose names do not appear in the captions. Anyone having further information concerning copyright holders is asked to contact Getty Publications so this information can be included in future printings.

This publication was peer reviewed through a single-masked process in which the reviewers remained anonymous.

Front cover: Double-hinged wig spectacles, ca. 1795. White metal frame and glass lenses, 38 mm (eye). London, British Optical Association Museum, College of Optometrists, inv. 1998.235.

</div>