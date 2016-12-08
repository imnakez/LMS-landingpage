# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
	port: 9800

	# ignoreCustomPatterns: /\/scr\/styles\/styles\.less$/gm
	#ignorePath: ['/src/styles']
	#ignoreCustomPatterns: /^\S*([.]less)/gm

	templateData:
		site:
			# The production url of our website. Used in sitemap and rss feed
			url: "http://anyarty.github.io/LMS-landingpage"

			# no slash at the end
			canonicalUrl: "http://anyarty.github.io/LMS-landingpage"

			# The website's styles
			styles: [
				'/styles/styles.css'
			]

			# The website's production scripts.
			# See also Environments section below for development scripts
			scripts: [
				'/vendor/bootstrap/js/bootstrap.min.js'
				'/vendor/sticky/jquery.sticky.min.js'
				'/vendor/jquery.localScroll/jquery.localScroll.min.js'
				'/vendor/jquery.scrollTo/jquery.scrollTo.min.js'
				'/vendor/bowser/bowser.min.js'
				'/vendor/alfablur/StackBlur.js'
				'/vendor/alfablur/alfablur.js'
				'/scripts/script.js'
			]
# -----------------------------
# Helper Functions

		isActive: (s) ->
# current links in navigation
			if s == @document.url
				"active"

	# Environments
	environments:
		development:
			templateData:
				site:
					url: 'http://localhost:9800'
			port: 9800

			plugins:
				grunt:
					# writeAfter: ["dev"]
					writeAfter: false
					writeBefore: false
					renderBefore: false
					renderAfter: false
					generateBefore: false
					generateAfter: false

	# Plugins configurations
	plugins:
		ghpages:
			deployRemote: 'deploy'
			deployBranch: 'master'
		less:
			compress: false
		grunt:
# writeAfter: ['prepare', 'postprocess']
			writeAfter: false
			writeBefore: false
			renderBefore: false
			renderAfter: false
			generateBefore: false
			generateAfter: false
		ignoreincludes:
			ignoredExtensions: ['inc']
}

# Export the DocPad Configuration
module.exports = docpadConfig
