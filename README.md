# Alpheios Morphological Lookup Library

The Alpheios Morphological Library is the first in a set of deliverables which reenvision the Alpheios functionality in such a way that it can serve not only the [Alpheios Reading Tools](http://alpheios.net), but also other online reading environments for ancient texts, such as those of the [Digital Latin Library](http://digitallatin.org/) and the [Perseus Digital Library](http://www.perseus.tufts.edu) . We expect to leverage many aspects of the original Alpheios design, particularly its approach to modularization and configuration, as well as its interfaces to supporting services.

The Alpheios libraries project will build a set of core Javascript libraries, that can be distributed as npm and bower packages, to provide reading support services in a mix-and-match approach, depending upon the language and functionality desired.  These libraries will interface when needed with hosted services for server-side functionality using standard APIs for access morphological parsers, annotation stores, lexicons and so forth. Existing services such as the [Tufts Morphology Service](http://sites.tufts.edu/perseusupdates/2012/11/01/morphology-service-beta/) will be used, but in some cases new services may be needed to be developed and service APIs formalized.

We are starting by developing the following core feature set:

  1. __lookup of the selected word or phrase in one or more morphology service engines to parse and identify the possible lemmas and inflections__
  1. lookup of the lemmas in one or more dictionaries to retrieve and display short and full definitions
  1. linking to and display of the appropriate sections from one or more grammatical references
  1. linking to and display of inflection tables

Additional advanced functionality may follow, such as:

  1. query of annotation stores for treebanks of the text in order to disambiguate morphological attributes and display syntactic dependency trees
  1. query of annotation stores for other relevant annotations and data sets such as translation alignments, commentaries, frequency and concordance tables, etc.
  1. direct integration with annotation environments such as Perseids

We will adhere to design principles that require back-end independence, use of established APIs for service integration, and high configurability that allows users of the libraries to use their back-end services of choice for access to server-side functionality. We would also adhere to the Alpheios approach to language-independence, building core functionality that serves all languages but allowing for language-specific extension of this functionality as needed.

To validate their general purpose nature, we will use these libraries to provide client-side reading support functionality not only as embedded libraries in the Digital Latin Library and Perseus 5 , but also as components in a replacement browser plugin for Alpheios.  Using them in a browser plugin as well as on hosted pages for different projects will allow us to ensure that we are not too tightly coupling them with any one project's needs or approach to the user interface.

By developing the libraries from the outset to support multiple projects, we also hope to help ensure their sustainability.  We will build them as a collaborative community of projects and developers working together to enhance and maintain the code.

This project is receiving support from the [Andrew W. Mellon Foundation](http://www.mellon.org/) and the [the Humboldt Chair of Digital Humanities at Leipzig](http://www.dh.uni-leipzig.de/wo/)
