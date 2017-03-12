# ![image](app/img/icon.png) Codix Chrome Extension
Adds Codix ratings to the top of GitHub repo pages, along with a "rate this" button.

We've made our source code public so developers know exactly what this extension does and does not do.

Questions, comments or concerns? Feel free to contact us directly at [info@codix.io](mailto://info@codix.io).

[![image](misc/chrome-store-badge-large.png)](https://chrome.google.com/webstore/detail/codix/adkkkfpgmaiojbmhblpolkocfllgcnno)

## How it Works
* Looks ***only*** for GitHub pages that look like repo pages.
* Uses the public Github Repo URL to do a lookup on Codix.
* If the repo is found then the Codix ratings bar is displayed.

## Installing from Source
If you'd like to install this extension from source, you certainly can!  Here's how:

1. [Enable developer mode](https://developer.chrome.com/extensions/faq#faq-dev-01) in your Chrome Browser.
2. Download this extension's source from GitHub as a Zip file and extract it into the directory where you wish to keep it.
3. From the directory you created in Step 2, load the app dir as an ["Unpacked Extension"](https://developer.chrome.com/extensions/getstarted#unpacked).

## Packaging
From the command-line run `misc/package.sh`.  This produces `codix-chrome-extension.zip` in the root directory which can be published to the chrome web store.
