// set to true to enable localhost communication (for testing)
// will also need to add a localhost permission to manifest.json:
// "https://localhost:8443/*"
var isDevMode = false;
var codixDomain = isDevMode ? "https://localhost:8443" : "https://codix.io";
var thisRepoName = undefined;
var thisOwnerName = undefined;
var isVisible = false;

Vue.component('codix-rating-box', {
    template: `
<span v-bind:class="scoreElementClass" style="padding-right: 12px;">
    <span class="scoreBoxLabel">{{name}}:</span>
    <div class="scoreBox" v-bind:class="scoreClass">
        {{value > 0 ? value.toFixed(1) : '-'}}
    </div>    
</span>`,
    props: ['name', 'value', 'isHighlighted'],
    computed: {
        scoreClass: function() {
            if(this.value == 5) {
                return 'fiveStars';
            } else if(this.value >= 4) {
                return 'fourStars';
            } else if(this.value >= 3) {
                return 'threeStars';
            } else if(this.value >= 2) {
                return 'twoStars';
            } else if(this.value >= 1) {
                return 'oneStar';
            } else {
                return 'noStars';
            }
        },
        scoreElementClass : function() {
            return this.isHighlighted ? "scoreElementHighlighted" : "scoreElementNormal";
        }
    }
});

Vue.component('codix-toolbar', {
    template: `
<transition name="slide-fade">
<div v-if="show" class='header codixHeader'>
    <div class='container' style='text-align: right'>
        <span v-if="repo.overallRating > 0">
            <codix-rating-box :name="'Usability'" :value="repo.avgUsability"/>
            <codix-rating-box :name="'Functionality'" :value="repo.avgFunctionality"/>
            <codix-rating-box :name="'Stability'" :value="repo.avgStability"/>
            <codix-rating-box :name="'Performance'" :value="repo.avgPerformance"/>
            <codix-rating-box :name="'Support'" :value="repo.avgSupport"/>
            <codix-rating-box :name="'Overall'" :value="repo.overallRating" :isHighlighted="true"/>
        </span>
        <span v-else style="padding-right: 12px; color: lightyellow;">
            Be the first to rate {{repo.name}}! 
        </span>  
        <button class='codixButton similarButton' style="margin-right: 12px;" v-if="repo.similarRepos.length > 0" v-on:click="similarClicked">{{repo.similarRepos.length}} Similar</button>
        <button class='codixButton rateButton'  style="vertical-align: bottom;" v-on:click="rateClicked">Rate</button>
    </div>
</div>
</transition>`,
    props: ['repo', 'show'],
    methods: {
        rateClicked: function() {
            gotoUri(this.repo.codixUri + "?ref=plugin")
        },

        similarClicked: function() {
            gotoUri(this.repo.compareSimilarUri)
        }
    },
    computed: {
        codixImg: function() {
            return chrome.extension.getURL("logo-white.png");
        }
    }
});

function gotoUri(destUri) {
    // try to open in a new tab:
    var win = window.open(destUri, '_blank');
    if (win) {
        //Browser has allowed it to be opened:
        win.focus();
    } else {
        //Browser has blocked us so navigate directly:
        window.location.href = destUri;
    }
}

function initCodix() {
    // TODO: need a better way to detect and avoid 404's; wont work for non english users for example.
    var notFoundTitle = "Page not found · GitHub";
    var pageTitle = $(document).find("title").text();
    var is404 = pageTitle === notFoundTitle;
    var thisPageUri = $(location).attr('href');
    var result = thisPageUri.match(/^https:\/\/github.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)\/?.*$/);
    if (!is404 && result && result.length == 3) {
        thisOwnerName = result[1];
        thisRepoName = result[2];
        var codixUri = codixDomain + "/gh/repo/" + thisOwnerName + "/" + thisRepoName;
        $.ajax({
            url: codixUri + "?format=json"
        }).then(function (data) {
            if (data) {
                vue.repo = data;
                vue.show = true;
            } else {
                // server might be down, etc.
            }
        });
    } else if(vue.show) {
        vue.show = false;
    }
}

// startup!
$("body").prepend('<div id="codix-entry-point" style="background-color: #24292e;"><codix-toolbar :repo="repo" :show="show"></codix-toolbar></div>');
var vue = new Vue({
    el: '#codix-entry-point',
    data: {
        repo: undefined,
        show: false
    }
});

initCodix();