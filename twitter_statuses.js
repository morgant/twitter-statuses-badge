// 
// twitter_statuses.js
// 
// A modification of the official Twitter JavaScript badge found here:
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
// One might also want to integrate Jon Aquino's date parsing fix for IE:
//
//    http://jonaquino.blogspot.com/2006/12/twitter-increasing-number-of-twitters.html
// 
// v0.1   2007-05-02 - Morgan Aldridge <morgant@makkintosshu.com>
//                     Initial release.
// 

function relative_time(time_value) {
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
}

function twitterCallback(obj) {
    var id = obj[0].user.id;
    var statuses_html = '';
    
    document.getElementById('my_twitter').innerHTML = '<a href="http://twitter.com/' + obj[0].user.screen_name + '"><img src="' + obj[0].user.profile_image_url + '" alt="' + obj[0].user.name + '" /></a>';
    
    for ( var i = 0; i < obj.length; i++ ) {
    	statuses_html += '<li class="';
    	if ( i == 0 ) {
    		statuses_html += 'first';
    	} else if ( i == (obj.length - 1) ) {
    		statuses_html += 'last';
    	}
    	if ( ((i+1) % 2) == 0 ) {
    		statuses_html += ' even';
    	}
    	else {
    		statuses_html += ' odd';
    	}
    	statuses_html += '">';
    	statuses_html += obj[i].text;
    	statuses_html +=' <span>(<a href="http://twitter.com/' + obj[i].user.screen_name + '/statuses/' + obj[i].id + '">' + relative_time(obj[i].created_at) + '</a>)</span></li>';
    }
    document.getElementById('my_twitter_statuses').innerHTML = statuses_html;
}