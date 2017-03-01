# ![image](app/img/icon.png) Codix Chrome Extension
Adds Codix ratings to the top of GitHub repo pages, along with a "rate this" button.

We've made our source code public so developers know exactly what this extension does and does not do.

Questions, comments or concerns? Feel free to contact us directly at [info@codix.io](mailto://info@codix.io).

## Install from the Chrome Store
Use [this link](https://chrome.google.com/webstore/detail/codix/adkkkfpgmaiojbmhblpolkocfllgcnno) to install directly from the Chrome Store.

## Install from source
If you'd like to install this extension from source, you certainly can!  Here's how:

1. [Enable developer mode](https://developer.chrome.com/extensions/faq#faq-dev-01) in your Chrome Browser.
2. Download this extension's source from GitHub as a Zip file and extract it into the directory where you wish to keep it.
3. From the directory you created in Step 2, load the app dir as an ["Unpacked Extension"](https://developer.chrome.com/extensions/getstarted#unpacked).

## What it does
* Operates *only* on https://github.com pages.
* Looks for GitHub pages that look like repo pages.
* Parses a potential repo page's public URL for the repo owner and repo name.
* Uses the above info to make a REST request to lookup the repo on Codix.
* If the lookup is successful then the Codix ratings bar is presented, showing the Codix results.
* If the lookup fails then nothing is shown.

That's it.

## Packaging
Just run `misc/package.sh`.  This will produce `codix-chrome-extension.zip` in the root directory which can then be uploaded
to the chrome store for publishing.
