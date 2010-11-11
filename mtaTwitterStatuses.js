// 
// mtaTwitterStatuses.js
// 
// A modification of the official Twitter JavaScript badge originally found
// here:
//
//    http://twitter.com/account/badge
//
// This modification provides insertion of the user's image (linking to their
// twitter page), displaying one or more of the user's recent tweets (including
// time posted, linking to that tweet's permalink), plus a bunch of CSS hooks
// for the list items.
//
// This package contains an html file and associated CSS & image files, but they 
// are merely an example of usage and only this JavaScript file is needed (it
// can be embeded directly in any HTML document, if you prefer).
// 
// v0.1   2007-05-02 - Morgan Aldridge <morgant@makkintosshu.com>
//                     Initial release.
// v0.2   2009-01-07 - Morgan Aldridge
//                     Integrated Jon Aquino's IE date parsing fix. Minor HTML
//                     tweaks & function name changes for better namespacing.
// v0.3   2009-01-09 - Morgan Aldridge
//                     Integrated regular expressions for making @replies and
//                     links clickable, thanks to René van Meurs
//                     <info@renevanmeurs.nl>.
// v0.4   2009-02-11 - Morgan Aldridge
//                     Updated regular expressions to find @replies butting up
//                     against punctuation. Some HTML restructuring.
// v0.5   2009-05-05 - Morgan Aldridge
//                     Added feature to filter out @replies, if requested.
// v0.6   2010-05-24 - Morgan Aldridge
//                     Further namespacing improvements plus variables for
//                     defaults/settings. Re-implemented @reply filtering, 
//                     limiting tweet count, and added changing of the element
//                     ID and disabling the icon.
// v0.6.1 2010-05-27 - Morgan Aldridge
//                     Clickable #hashtags, smaller JSON requests from Twitter.
// v0.7   2010-11-10 - Morgan Aldridge
//                     More flexible adding of classes, plus "reply" class. Purely
//                     CSS rendering (no images) of default theme. Now using John
//                     Gruber's improved regex for matching URLs. Supports Twitter
//                     Search results as well.
// 

if (!window['makkintosshu']) { window['makkintosshu'] = {}; }
if (!window['makkintosshu']['twitterStatuses']) { window['makkintosshu']['twitterStatuses'] = {}; }
makkintosshu.twitterStatuses = {
	elementId: 'mtaTwitter',
	tweetCount: 5,
	filterReplies: false,
	filterRetweets: false,
	showIcon: true,
	
	// Make date parseable in IE [Jon Aquino 2007-03-29]
	// http://jonaquino.blogspot.com/2006/12/twitter-increasing-number-of-twitters.html
	fixDate: function (d) {
		var a = d.split(' ');
		var year = a.pop();
		return a.slice(0, 3).concat([year]).concat(a.slice(3)).join(' ');
	},

	relativeTime: function (time_value) {
		var parsed_date = Date.parse(time_value);
		
		var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
		var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
		
		if ( delta < 60 ) {
			return 'less than a minute ago';
		} else if ( delta < 120 ) {
			return 'about a minute ago';
		} else if ( delta < (45*60) ) {
			return (parseInt(delta / 60)).toString() + ' minutes ago';
		} else if ( delta < (90*60) ) {
			return 'about an hour ago';
		} else if ( delta < (24*60*60) ) {
			return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
		} else if ( delta < (48*60*60) ) {
			return '1 day ago';
		} else {
			return (parseInt(delta / 86400)).toString() + ' days ago';
		}
	},
	
	twitterCallback: function (obj) {
		var statuses_html = '';
		var isEven = false;
		var maxTweets = makkintosshu.twitterStatuses.tweetCount;
		var tweetCount = 0;
		var search = false;
		var tweets = obj;
		
		if ( obj.results )
		{
			search = true;
			tweets = obj.results;
		}
		else if ( makkintosshu.twitterStatuses.showIcon ) {
			statuses_html += '<a href="http://twitter.com/' + obj[0].user.screen_name + '"><img src="' + obj[0].user.profile_image_url + '" alt="' + obj[0].user.name + '" /></a>' + "\n";
		}

		statuses_html += "<ul>\n";
		
		for ( var i = 0; i < tweets.length && tweetCount < maxTweets; i++ ) {
			var tweet_text = tweets[i].text;
			var classes = [];
			var nonReply = (tweet_text.match(/^@[A-Z0-9_]+/gi) == null);
			
			if ( search || !makkintosshu.twitterStatuses.filterReplies || nonReply ) {
				tweetCount++;

				// John Gruber's "Improved Liberal, Accurate Regex Pattern for Matching URLs" (2010-07-27) for parsing links
				// http://daringfireball.net/2010/07/improved_regex_for_matching_urls
				tweet_text = tweet_text.replace(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi, '<a href="$1">$1</a>');
				tweet_text = tweet_text.replace(/(@([A-Z0-9_]+))/gi, '@<a class="reply" title="$2 on twitter" href="http://twitter.com/$2">$2</a>');
				tweet_text = tweet_text.replace(/(#([A-Z0-9_]+))/gi, '<a class="hashtag" href="http://twitter.com/search?q=%23$2">#$2</a>');
    				
				if ( tweetCount == 1 ) {
    					classes.push('first');
				} else if ( tweetCount == maxTweets ) {
					classes.push('last');
				}
				if ( isEven ) {
					classes.push('even');
				} else {
					classes.push('odd');
				}
				if ( !nonReply )
				{
					classes.push('reply');
				}
				statuses_html += '<li class="' + classes.join(' ') + '">';
				if ( search && makkintosshu.twitterStatuses.showIcon ) {
					statuses_html += '<a href="http://twitter.com/' + tweets[i].from_user + '"><img src="' + tweets[i].profile_image_url + '" alt="' + tweets[i].from_user + '" /></a>' + "\n";
				} else if ( search )
				{
					statuses_html += '<span class="from">@<a href="http://twitter.com/' + tweets[i].from_user + '">' + tweets[i].from_user + '</a>: ';
				}

				statuses_html += tweet_text;
				if ( !search )
				{
					statuses_html += ' <span class="when"><a href="http://twitter.com/' + tweets[i].user.screen_name + '/statuses/' + tweets[i].id + '">' + makkintosshu.twitterStatuses.relativeTime(makkintosshu.twitterStatuses.fixDate(tweets[i].created_at)) + "</a></span></li>\n";
				}
				else
				{
					statuses_html += ' <span class="when"><a href="http://twitter.com/' + tweets[i].from_user + '/statuses/' + tweets[i].id + '">' + makkintosshu.twitterStatuses.relativeTime(tweets[i].created_at) + "</a></span></li>\n";
				}

				isEven = !isEven;
			}
		}
		statuses_html += "</ul>\n";
		
		document.getElementById(makkintosshu.twitterStatuses.elementId).innerHTML = statuses_html;
	}
}

// Depricated, but kept for backwards compatibility with 0.5 and earlier... for now
var mtaTwitterStatusesFilterReplies = false;
function mtaTwitterCallback(obj) { makkintosshu.twitterStatuses.twitterCallback(obj); }

