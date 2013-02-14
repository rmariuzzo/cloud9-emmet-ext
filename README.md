Cloud9 Emmet Extension
==========================

A [Cloud9ide](http://c9.io/) extension for [Emmet](http://emmet.io/) integration.


What is Emmet?
------------------

Emmet (known as Zen Coding) is a web-developer's toolkit that can greatly 
improve your HTML & CSS workflow.

Basically, most text editors out there allow you to store and re-use commonly 
used code chunks, called “snippets”. While snippets are a good way to boost 
your productivity, all implementations have common pitfalls: you have to define 
the snippet first and you can’t extend them in runtime.

Emmet takes the snippets idea to a whole new level: you can type CSS-like 
expressions that can be dynamically parsed, and produce output depending on 
what you type in the abbreviation. Emmet is developed and optimised for 
web-developers whose workflow depends on HTML/XML and CSS, but can be used with 
programming languages too.

Available Actions
-----------------

 - Expand Abbreviation - <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>E</kbd>

Upcoming Actions
----------------

 - Match Tag Pair
 - Go to Matching Pair
 - Wrap with Abbreviation
 - Go to Edit Point
 - Select Item
 - Toggle Comment
 - Split/Join Tag
 - Remove Tag
 - Merge Lines
 - Update Image Size
 - Evaluate Math Expression
 - Increment/Decrement Number
 - Reflect CSS Value
 - Encode/Decode Image to data:URL

Development
-----------

Follow these instruction to start developing:

 1. Fork this git repo: `http://github.com/rmariuzzo/cloud9-emmet-ext.git`.
 2. Clone your fork into Cloud9 IDE.
 3. Start a terminal in Cloud9 IDE and type: `npm install` (this will download and install some dependencies).
 4. In Cloud9 IDE go to _Tools_ and click over _Extension Manager_.
 5. Add the URL of your working: `https://c9.io/<your-username>/cloud9-emmet-ext/workspace/cloud9-emmet-ext.js`.

Now, you are good to code!