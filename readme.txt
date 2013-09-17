=== Tagregator ===
Contributors:      wordpressdotorg, iandunn
Donate link:       http://wordpressfoundation.org
Tags:              hashtag, social media, aggregation, stream
Requires at least: 3.5
Tested up to:      3.6
Stable tag:        0.1
License:           GPLv2 or Later

Aggregates hashtagged content from multiple social media sites into a single stream.


== Description ==

Tagregator lets you add a shortcode to a post or page on your site, and pull in content from various social media networks onto that page. For example, if you add `[tagregator hashtag="#WordPress"]` into a page, then you'll see posts that mention the #WordPress hashtag.

= Included Social Media Sources: =
* Twitter
* Instagram -- planned for upcoming release
* Flickr -- planned for future release

= Support Expectations: =
We're only able to only provide limited support. Please see [the FAQ](http://wordpress.org/plugins/tagregator/faq/) for details.


== Installation ==

After installing the plugin, [add the [tagregator] shortcode to a post or page](http://codex.wordpress.org/Shortcode), and include the hashtag you want to aggregate:

Examples:

`[tagregator hashtag="#WordPress"]`

`[tagregator hashtag="#kiva"]`

`[tagregator hashtag="#overtherhine"]`


You can also enter keywords or search queries, like this:

`[tagregator hashtag="cooking"]`

`[tagregator hashtag="ice cream"]`


== Frequently Asked Questions ==

= Do you provide support for this plugin? =
We created this plugin to scratch our own itch, and are happy to offer the code to the community in the spirit of open source. We are only able to provide limited support, however. If you find a legitimate bug or security vulnerability\*, please let us know; we take those seriously and will fix them. On the other hand, if you're just having trouble using the plugin, or making it fit your specific needs, then you'll need to solve the problem yourself, hire a developer, or get help from the community.

\* If you do find a security issue, please disclose it to us privately by sending an e-mail to security@wordpress.org, so that we can release a fix for it before you publish your findings.


= Why do posts show up with the wrong time? =

This is probably because you haven't configured your timezone in WordPress's General Settings. After updating the timezone, you may need to wait up to 23 hours for new posts to appear ahead of the ones that were saved with the old timezone.

= Why are some Tweets missing? =
Twitter's API doesn't guarantee that every tweet will be available in the results it returns.


== Screenshots ==
1. An example of how the social media stream looks
2. The settings panel
3. The social media items stored as a custom post type


== Changelog ==

= v0.1 (9/17/2013) =
* [NEW] Initial release


== Upgrade Notice ==

= 0.1 =
Initial release.