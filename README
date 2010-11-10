twitter_statuses_badge / mtaTwitterStatuses.js README
=====================================================

http://www.makkintosshu.com/development#twitter-statuses-javascript-badge

by Morgan Aldridge <morgant@makkintosshu.com>

OVERVIEW
--------

A modification of the official Twitter JavaScript badge originally found here:

   http://twitter.com/account/badge

This modification provides insertion of the user's image (linking to their twitter page), displaying one or more of the user's recent tweets (including time posted, linking to that tweet's permalink) or search results, optional filtering of tweets starting with an @reply, plus a bunch of CSS hooks for the list items.

This package contains an html file and associated CSS & image files, but they are merely an example of usage and only the mtaTwitterStatuses.js JavaScript file is needed (it can be embeded directly in any HTML document, if you prefer).

BASIC INSTRUCTIONS

There are three steps to using mtaTwitterStatuses.js:

1) Include the JavaScript in the HEAD of your HTML (or paste it in it's entirety):

	<script type="text/javascript" src="your/path/to/mtaTwitterStatuses.js"></script>

2) Include the mtaTwitter DIV element somewhere in the BODY of your HTML, where you'd like the twitter badge to appear:

	<div id="mtaTwitter"></div>

3) Include the Twitter JavaScript call in the BODY of your HTML (replacing my Twitter account name, 'morgant', with your own). For simplicity, you can paste it in immediately after the aforementioned DIV, but I'd suggest inserting it just before the closing </body> tag to ensure that your HTML content still loads in its entirety, even if Twitter is down:

	<script type="text/javascript" src="http://www.twitter.com/statuses/user_timeline/morgant.json?skip_user=true&callback=makkintosshu.twitterStatuses.twitterCallback"></script>

Or, if you want to display search results (for '@morgant', in this example), you can use the following Twitter JavaScript call instead of the above:

	<script type="text/javascript" src="http://search.twitter.com/search.json?q=%40morgant&show_user=true&callback=makkintosshu.twitterStatuses.twitterCallback"></script>

That's it! Let me know if you have any questions, bug reports, or feature requests.

ADVANCED FEATURES

In addition to the CSS hooks so that you have finer grained control over the styling of the badge, I'm also revealing preferences which you may set to use more advanced features.

To use them, you must add an extra <script type="text/javascript"></script> block after the include of mtaTwitterStatuses.js and before you call the callback In this block, you should set one of the following makkintosshu.twitterStatuses variables accordingly:

	elementId: This allows you to specify the HTML element ID you want the Twitter statuses inserted into. Default is 'mtaTwitter'.
	
	tweetCount: (1-20) This will limit the number of tweets shown to the number specified. Default is 5.
	
	filterReplies: (true/false) This will filter out tweets that start with an @reply. Default is false. (Note: Ignored when displaying search results.)
	
	showIcon: (true/false) This will allow you not insert the account's icon before the list of tweets. Default is true;

Example:

	<script type="text/javascript">
		makkintosshu.twitterStatuses.elementId = 'twitter';
		makkintosshu.twitterStatuses.tweetCount = 1;
		makkintosshu.twitterStatuses.showIcon = false;
		makkintosshu.twitterStatuses.filterReplies = true;
	</script>

CHANGE LOG

v0.7 - More flexible adding of classes, plus "reply" class. Purely CSS rendering (no images) of default theme. Now using John Gruber's improved regex for matching URLs. Supports Twitter Search results as well.

v0.6.1 - Clickable #hashtags, smaller JSON requests from Twitter.

v0.6 - Further namespacing improvements plus variables for defaults/settings. Re-implemented @reply filtering, limiting tweet count, and added changing of the element ID and disabling the icon.

v0.5 - Added feature to filter out @replies, if requested.

v0.4 - Updated regular expressions to find @replies butting up against punctuation. Some HTML+CSS restructuring.

v0.3 - Integrated regular expressions for making @replies and inks clickable, thanks to René van Meurs.

v0.2 - Integrated Jon Aquino's IE date parsing fix. Minor HTML+CSS tweaks & function name changes for better namespacing.

v0.1 - Initial release.
