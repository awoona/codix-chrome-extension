Vue.component('codix-rating-box', {
    template: `
<span style="padding-right: 12px;">
    <span class="scoreBoxLabel">{{name}}:</span>
    <div class="scoreBox" v-bind:class="scoreClass">
        {{value > 0 ? value.toFixed(1) : '-'}}
    </div>    
</span>`,
    props: ['name', 'value'],
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
        }
    }
});

Vue.component('codix-toolbar', {
    template: `
<transition name="slide-fade">
<div v-if="show" class='header codixHeader'>
    <div class='container' style='text-align: right'>
        <codix-rating-box :name="'Usability'" :value="repo.avgUsability"/>
        <codix-rating-box :name="'Functionality'" :value="repo.avgFunctionality"/>
        <codix-rating-box :name="'Stability'" :value="repo.avgStability"/>
        <codix-rating-box :name="'Performance'" :value="repo.avgPerformance"/>
        <codix-rating-box :name="'Support'" :value="repo.avgSupport"/>
        <codix-rating-box :name="'Overall'" :value="repo.overallRating"/>
        <!--<button class='rateButton'  style="vertical-align: bottom;" v-on:click="rateClicked"><img class="codixImgIcon" v-bind:src="codixImg"/> Rate {{repo.name}}</button>        -->
        <button class='rateButton'  style="vertical-align: bottom;" v-on:click="rateClicked">Rate on Condix</button>
    </div>
</div>
</transition>`,
    props: ['repo', 'show'],
    methods: {
        rateClicked: function() {
            var destUri = "https://codix.io/gh/repo/" + thisOwnerName + "/" + thisRepoName;

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
    },
    computed: {
        codixImg: function() {
            return chrome.extension.getURL("logo-white.png");
        }
    }
});

var thisRepoName = undefined;
var thisOwnerName = undefined;

function initCodix() {
    // TODO: need a better way to detect and avoid 404's.  This wont work
// TODO: for non english users for example.
    var notFoundTitle = "Page not found · GitHub";
    var pageTitle = $(document).find("title").text();
    var is404 = pageTitle === notFoundTitle;
    var thisPageUri = $(location).attr('href');
    var result = thisPageUri.match(/^https:\/\/github.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/);
    if (!is404 && result.length == 3) {
        var domain = "https://codix.io"; // TODO: use prod domain
        thisOwnerName = result[1];
        thisRepoName = result[2];
        var codixUri = domain + "/gh/repo/" + thisOwnerName + "/" + thisRepoName;
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