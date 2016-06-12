# Functional Requirements

1. activate mouseover/touch (as appropriate for media) behavior for text on any page
    1. must work on text in any valid HTML5 element (including SVG and Web Component)
    1. must work in main body as well as in an iframe
1. identify the word token(s) selected, with surrounding context if applicable (per configuration)
    1. try to automatically detect language of the token(s) selected, but allow user to override if language detection fails
1. submit the token(s) to a morphology provider + short definition provider
    1. this may be two chained providers (one for morphology one for short definitions) or a single combined provider
    1. either may be a local lookup in a local browser-provided file or a remote service
    1. enable the possibility for the target language for short definitions to be something other than english
1. parse the response from the morphology service and short definition provider
1. be able to apply disambiguation algorithms to reduce possibilities, if available
    1. could be rule based, or via submission to an external query service
1. make the results available in each of the following ways
    1. as a JSON object with semantically meaningful properties
    1. as an HTML fragment with namespaced, semantically meaningful classes on all elements
        1. calling library should be able to specify an id of an element on the calling page to which the html 
        fragment gets appended
1. information which must be accessible in the response (as available from provider) for all possible analyses:
    1. dictionary headword (lemmas)
    2. short definitions and languages(s)
    2. language(s) of short definitions
    3. parts of speech
    4. inflection attributes (per alpheios lexicon schema)
    5. source and copyright information
    6. notes/extra data
    7. related links
1. the library must be distributed as an npm module or bower package
1. the library must be deployable in
   1. an embedded library in CapiTaiNs Nemo
   1. an embedded library in the DLL UI
       1. (see https://github.com/TEIC/CETEIcean and http://digitallatin.github.io/viewer/editio-2.0.html) 
   1. Alpheios branded google chrome and firefox extension where the extension wrapper code provides
       1. activation/deactivation hook via a toolbar icon
       1. access to configuration options
       1. styling and display

# Design Requirements

1. The following behavior should be modularized so that support for additional languages can be easily added to the
library without requiring changes to code for other languages:
    1. tokenization algorithms
    1. normalization algorithms
    1. disamibugation algorithms (which could be via service call)
1. The following behavior must be configurable by the user of the library on a per-language basis:
    1. event trigger (mouse/touch vs click)
    1. context to include (i.e. number of tokens before and after the selected token) in service requests)
    1. morphological service provider
        1. should allow for definition of type (local or remote), url (if remote), API format, and version
    1. short definitions provider
        1. should allow for definition of type (local or remote), url (if remote), API format, and version
    1. disambugation provider
        1. should allow for definition of type (local or remote), url (if remote), API format, and version
    1. credit/copyright language for all data sources
1. The following behavior must be configurable by the user of the library at the general usage level:
    1. default language for source text
    1. a list of element `@id` and `@class` values regions of the page to be ignored by the library (i.e for
    which mouseover/popup behavior is deactivated)
    1. a list of element `@id` and `@class` values the page to which to limit the activity of the library
    (i.e for which mouseover/popup behavior is activated)
    1. ability to activate/deactivate console debugging
1. Use [rollup.js](http://rollupjs.org/) to produce a single, deployable js with minimal dependencies
1. Use a modular design, with ES6 Modules back-compiled by Babel for compatibility with current browsers
1. Reuse of other 3rd party libraries (e..g jQuery) is generally okay, but strive for simplicity and minimal
dependencies
1. Use an i18n library for all UI text
1. No other js frameworks without prior discussion and approval by the team.
1. Do not tightly couple the lookup functionality with the service API. (Abstract the functionality from the provider).
    1. the initial release can support only services which provide the current Tufts Morphology Service API, but we
    want the ability to extend easily to other morphological/short definition lookup services which provide equivalent
    functionality under a well-defined API, and to be able to support newer versions of the existing API
1. Do not embed a dependency on a specific CSS framework such as foundation or bootstrap for display of the results.
    1. If calling code wants to use these to style the results they can, but the lexical lookup library should only
    provide HTML fragements which can be easily styled (i.e. with namespaced, semantically meaningful classes on all
    elements)


# Development Practices

1. Implement unit tests for all functionality
    1. unit tests should cover all supported source languages
1. Use Travis for CI
1. Use ESLint or JSLint to enforce coding practices
1. Document all configuration options
1. Document code (why not what)
1. Do frequent commits and pushes to github (no less than daily push, and small commits)

# Before beginning development please read:

1. [alpheios-popup.js](https://sourceforge.net/p/alpheios/code/HEAD/tree/basic-reader/trunk/content/alpheios-popup.js), starting from doMouseMoveOverText and following the logic as best as possible through the end of
showPopup
1. es6 module/rollup links
    1. http://rollupjs.org/guide/
    1. https://medium.com/@trek/last-week-i-had-a-small-meltdown-on-twitter-about-npms-future-plans-around-front-end-packaging-b424dd8d367a#.d87x64w9z
1. Chrome and Firefox extension developer's guides
