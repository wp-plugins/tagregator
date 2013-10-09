=== Tagregator ===
Contributors:      wordpressdotorg, iandunn
Donate link:       http://wordpressfoundation.org
Tags:              hashtag, social media, aggregation, stream
Requires at least: 3.5
Tested up to:      3.6
Stable tag:        0.2
License:           GPLv2 or Later

Aggregates hashtagged content from multiple social media sites into a single stream.


== Description ==

Tagregator lets you add a shortcode to a post or page on your site, and pull in content from various social media networks onto that page. For example, if you add `[tagregator hashtag="#WordPress"]` into a page, then you'll see posts that mention the #WordPress hashtag.

= Included Social Media Sources: =
* Twitter
* Instagram -- planned for upcoming release
* Flickr -- planned for future release


== Installation ==

For help installing this (or any other) WordPress plugin, please read the [Managing Plugins](http://codex.wordpress.org/Managing_Plugins) article on the Codex.

**Step 1)** After installing the plugin, go to the Tagregator > Settings screen and enter the credentials for the services you want to use.

When <a href="https://dev.twitter.com/apps/new">creating a Twitter application</a>, you should enter the URL of your website in the "Website" field (e.g., `http://www.example.org`), and then leave the "Callback URL" field empty. Once the application is created, copy the Consumer Key and Consumer Secret into Tagregator's settings.

**Step 2)** [Add the [tagregator] shortcode to a post or page](http://codex.wordpress.org/Shortcode), and include the hashtag you want to aggregate:

Examples:

`[tagregator hashtag="#WordPress"]`

`[tagregator hashtag="#kiva"]`

`[tagregator hashtag="#overtherhine"]`


You can also enter keywords or search queries, like this:

`[tagregator hashtag="cooking"]`

`[tagregator hashtag="ice cream"]`

**Step 3)** Wait 30-60 seconds for the plugin to pull new content in.


== Frequently Asked Questions ==

= I setup the shortcode, but no posts have been imported =
When setting it up the first time, make sure you wait 30-60 seconds in order to let the plugin pull in the first round of posts.

= Why do posts show up with the wrong time? =
This is probably because you haven't configured your timezone in WordPress's General Settings. After updating the timezone, you may need to wait up to 23 hours for new posts to appear ahead of the ones that were saved with the old timezone.

= Why are some Tweets missing? =
Twitter's API doesn't guarantee that every tweet will be available in the results it returns.

= How should I disclose security vulnerabilities? =
If you find a security issue, please disclose it to us privately by sending an e-mail to security@wordpress.org, so that we can release a fix for it before you publish your findings.


== Screenshots ==

1. An example of how the social media stream looks
2. The settings panel
3. The social media items stored as a custom post type


== Changelog ==

= v0.2 () =
* [FIX] No longer assuming that term slug matches sanitized version of term name. Fixes bug where Tagregator term would be created with "-2" and would never get posts.
* [NEW] Images attached to Tweets are now displayed.
* [NEW] Retweets are no longer imported.
* [NEW] URLs inside posts are now converted to hyperlinks.
* [UPDATE] Tweet content sanitized with wp_kses() instead of sanitize_text_field().
* [UPDATE] Moved all includes to bootstrapper.

= v0.1 (9/17/2013) =
* [NEW] Initial release


== Upgrade Notice ==

= 0.2 =
Version 0.2 displayed images attached to tweets and ignores retweets.

= 0.1 =
Initial release.