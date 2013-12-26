brevity.js
==========

**brevity.js** is a javascript plugin for wrapping registered abbreviations in `abbr` tags.  This automates the repetitive task of supplying `abbr` tags
for accessibility.  Abbreviations are registered on initialization and are completely customizable.



## Usage ##

Once you have included the javascript in your page, you can initialize the plugin by calling the *brevity()* function.  The function has a single, required parameter.  You must pass the function an array of abbreviations that you would like to register with the plugin.



### The abbreviation array ###

The abbreviation array defines  all abbreviations you want registered with the plugin.  Each item in the array is an object that should contain the following two properties:

<table summary="Required properties in abbreviation objects for brevity.js">
	<thead>
		<tr>
			<th scope="col">Property</th>
			<th scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>abbr</td>
			<td>The abbreviation string the plugin will search for and will wrap in <code>abbr</code> tags</td>
		</tr>
		<tr>
			<td>title</td>
			<td>The expanded text for the abbreviation that will be used in the *title* attribute of the <code>abbr</code> tag</td>
		</tr>
	</tbody>
</table>



### The options object ###

As a second, optional, parameter **brevity.js** takes an options object.  The following options can be set:

<table summary="Required properties in abbreviation objects for brevity.js">
	<thead>
		<tr>
			<th scope="col">Property</th>
			<th scope="col">Type</th>
			<th scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>root</td>
			<td>DOM Node</td>
			<td>The root node from which to begin parsing for abbreviations.  Only nodes within the root node will be converted to `abbr` tags</td>
		</tr>
	</tbody>
</table>




## Namespaced abbreviations ##

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




### Sample code ###

	// Create the abbreviations array
	var abbrs = [
		{ abbr: 'DOM', title: 'Document Object Model' },
		{ abbr: 'HTML', title: 'Hypertext Markup Language' }
	]

	// Initialize the plugin
	brevity(abbrs);



