brevity.js
==========

**brevity.js** is a javascript plugin for wrapping registered abbreviations in `abbr` tags.  This automates the repetitive task of supplying `abbr` tags
for accessibility.  Abbreviations are registered on initialization and are completely customizable.



Usage
-----

Once you have included the javascript in your page, you can initialize the plugin by calling the *brevity()* function.  The function takes a single argument:

<table summary="Function arguments for brevity.js constructor function">
	<thead>
		<tr>
			<th scope="col">Argument</th>
			<th scope="col">Type</th>
			<th scope="col">Required</th>
			<th scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>abbrs</td>
			<td>object</td>
			<td>yes</td>
			<td>Javascript array defining abbreviation objects</td>
		</tr>
	</tbody>
</table>



Sample code
-----------

	// Create the abbreviations array
	var abbrs = [
		{ abbr: 'DOM', title: 'Document Object Model' },
		{ abbr: 'HTML', title: 'Hypertext Markup Language' }
	]

	// Initialize the plugin
	brevity(abbrs);



Abbreviation array
------------------

**brevity.js** requires an array of abbreviation objects to be passed as an argument.  Each item in the array is an object that should contain the following two properties:

<table summary="Required properties in abbreviation objects for brevity.js">
	<thead>
		<tr>
			<th scope="col">Property</th>
			<th scope="col">Description</th>
			<th scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>abbr</td>
			<td>string</td>
			<td>The abbreviation string the plugin will search for and will wrap in `abbr` tags</td>
		</tr>
		<tr>
			<td>title</td>
			<td>string</td>
			<td>The expanded text for the abbreviation that will be used in the *title* attribute of the `abbr` tag</td>
		</tr>
	</tbody>
</table>



Namespaced abbreviations
------------------------

For the occassion when one abbreviation can have multiple meanings, namespacing has been enabled to allow you to register multiple different meanings for a single abbreviation.
To namespace abbreviations, simply use a colon to add a namespace before the abbreviation.  For example, you could register two abbreviations for WWF as follows:

	// Using namespacing
	var abbrs = [
		{ abbr: 'Wrestle:WWF', title: 'World Wrestling Federation' },
		{ abbr: 'Pandas:WWF', title: 'World Wildlife Fund' }
	]
	
When using a namespace, everything to the left of the last colon (:) will be used simply for disambiguation purposes.  
Everything to the right of the final colon will be used for the abbreviation text.  So, using the example above would turn:

	The Wrestle:WWF is holdling a fundraiser to benefit the Panda:WWF.
	
into:

	The <abbr title="World Wrestling Federation">WWF</abbr> is holding a fundraiser to benefit the <abbr title="World Wildlife Fund">WWF</abbr>.

