ng-material-floating-button
========================

Material design floating action button implemented as an Angularjs directive.

Made to be semantic, fast and easy to customize.
~~Shamelessly~~ inspired by action buttons from Google Inbox, Evernote and Path.

##Demo##
Head over to the project [homepage](http://nobitagit.github.io/ng-material-floating-button/) to see it in action or just take a look at this awesome gif:

<img src="http://zippy.gfycat.com/LimitedTatteredFieldmouse.gif">

**Other versions**
- [Vanilla html](https://github.com/nobitagit/material-floating-button) (original, upstream version of the component)

##How to use##

Download/clone the repo or use Bower:
```
bower install ng-mfb --save
```

Then (optionally) run `npm install` to have access to the configured Grunt tasks.

Look in the `src` folder for usage examples and head to the original component [docs](https://github.com/nobitagit/material-floating-button#how-to-use) to see how to customise the styles of the menu.

###Basic setup###
Download the whole repo or clone it, then reference the directive css file (here is `mfb/src/mfb.css`)in your `<head>`:

```html
<link href="../path/to/css/mfb.css" rel="stylesheet"/>
```
Place a reference to the directive before the closing `<body>` tag or anywhere after your angular script tag.

```html
<script src="../mfb/src/mfb-directive.js"></script>
```
Make sure you reference the Mfb module as a dependecy to your app or module like so:
```js
var app = angular.module('your-app', ['ng-mfb']);
```
Finally, place the correct html structure in your template. As a first example, assuming your example is using [Ionicons](http://ionicons.com/) as icon font:

```html
<nav mfb-menu position="br" effect="zoomin" label="hover here"
     active-icon="ion-edit" resting-icon="ion-plus-round"
     toggling-method="click">
  <a mfb-button icon="paper-airplane" label="menu item"></a>
</nav>
```
This example shows the two basic components of the directive, a unique `mfb-menu` element which serves as a wrapper to a variable number of child buttons, defined by the `mfb-button` attribute.
This above code will output a basic button menu on the bottom right corner of the screen with a single menu item. Hardly amazing, so let's see how to customise it.

###Element attributes###
A number of attributes can be passed to the elements from the template in order to customise both behavior and appearance.

####`<mfb-menu>` element####
This can be defined as an attribute or an element. So this is valid:
```html
<ul mfb-menu></ul>
```
...and this is valid too:
```html
<mfb-menu></mfb-menu>
```
#####Position####
Defines in which corner of the screen the component should be displayed.

value | explanation
--- | ---
`tl` |  top-left corner
`tr` |  top-right corner
`br` |  bottom-right corner
`bl` |  bottom-left corner

Example:
```html
<ul mfb-menu position="br">
  <!-- this will be displayed on the bottom-right corner of the screen -->
</ul>
```
#####Toggling method####
Defines how the user will open the menu. Two values are possible:

value | explanation
--- | ---
`hover` | hover to open the menu
`click` | click or tap to open the menu

Example:

```html
<ul mfb-menu toggling-method="click">
  <!-- click on the button to open the menu -->
</ul>
```

**NOTE**: Using `hover` will prevent user browsing on modbile/touch devices to properly interact with the menu. The directive provides a fallback for this case.

If you want the menu to work on hover but need support for touch devices you first need to include Modernizr to detect touch support. If you are alreay using it in your project just make sure that the touch detection is enabled.

If you're not using Modernizr already, just include the tiny (<3KB) provided `modernizr.touch.js` script (look in the `mfb/src/lib/` folder) in your `<head>` or get the latest version of this very script right from [here](http://modernizr.com/download/#-touch-teststyles-prefixes). Note that this is a custom build and will only detect for touch support, it's not the full library.

#####Menu state####
You can optionally include the desired starting state of the menu (open or closed). If this attribute is not specified a closed state is assumed.

You can also programmatically open/close the menu leveraging this attribute at any time after compilation, without any clicking required by the user.

value | explanation
--- | ---
`open` | menu is... open (surprise, surprise)
`closed` | menu is...(hold tight) ... closed

#####Effect####
Defines the effect that is performed when the menu opens up to show its child buttons.

value | explanation
--- | ---
`zoomin` |  test it [here](http://nobitagit.github.io/ng-material-floating-button/)
`slidein` | test it [here](http://nobitagit.github.io/ng-material-floating-button/)
`fountain` | test it [here](http://nobitagit.github.io/ng-material-floating-button/)

Example:
```html
<ul mfb-menu effect="zoomin">
</ul>
```
#####Label####
The text that is displayed when hovering the main button.
Example:
```html
<ul mfb-menu label="your text here">
</ul>
```

#####Active-icon####
The icon that will be displayed by default on the main button.
Example:
```html
<ul mfb-menu active-icon="ion-edit">
</ul>
```
#####Resting-icon####
The icon that will be displayed on the main button when hovering/interacting with the menu.
Example:
```html
<ul mfb-menu resting-icon="ion-plus-round">
</ul>
```
####`<mfb-button>` element####
This element represents the child button(s) of the menu and can only "live" inside a wrapper `<mfb-menu>` element. Like its parent, it can be defined both as an attribute and as an element. So this is valid:
```html
<a mfb-button></a>
```
...and this is valid too:
```html
<mfb-button></mfb-button>
```
#####Icon####
Pass the class of the icon font character that is associated to the menu item:
Example:
```html
<a mfb-button icon="ion-paperclip"></a>
```
#####Label####
The text that is displayed when hovering the button.
Example:
```html
<a mfb-button label="About us"></a>
```

#####Custom attributes#####
Due to the nature of the component you'll probably want to associate some actions or use other angular directives such as ng-repeat on the buttons. As these attributes will be copied over to the generated html structure you can simply attach them to the `<mfb-element>`. A couple of examples, here using ui-router:
```html
<!-- if using ui-router, associate an on-click event to the anchor-->
<a mfb-button ui-sref="yourState"></a>
```
And here leveraging a basic ng-repeat with buttons defined via js:
```js
// in your controller...
$scope.buttons = [{
  label: 'a link text',
  icon: 'ion-paper-airplane'
},{
  label: 'another link',
  icon: 'ion-plus'
},{
  label: 'a third link',
  icon: 'ion-paperclip'
};
```
```html
<!-- in your template -->
<!-- this will output 3 buttons with different icon, label and so on-->
<a mfb-button label="{{button.label}}" icon="{{button.icon}}" ng-repeat="button in buttons"></a>
```

###More customisations###
The component have plenty more customisations available and they are all handled by the CSS. The CSS and its SCSS source files are found in the `mfb/` folder (which is actually a subtree that pulls from [this repo](https://github.com/nobitagit/material-floating-button)), while a customisation file is provided (`mfb/_customisation.scss`) to override the defaults without editing the source files.

For a thorough overview of what and how to customise the look of the component through css make sure you read [these docs](https://github.com/nobitagit/ng-material-floating-button/tree/master/mfb), especially if you plan to keep your copy in sync with this repo by pulling in changes in the future.

##Unit tests##
To run the tests you need Jasmine and Karma runner. They can be run from the console with either `grunt karma` or `karma start test/karma.conf.js` commands.

##Contributing and issues##
Contributions are very welcome, as well as opening issues if you find any bugs.
If an issue is **not** specifically related to the Angularjs version (i.e. it's a layout/css bug) please open it on the original component [repo](https://github.com/nobitagit/material-floating-button), if possible.

##Todos##
- [x] add "click to open" functionality and option
- [x] add to bower
- [ ] add to npm

##Credits##
Demo icons courtesy of [Ionicons](ionicons.com)
