let issueContainerEl = document.querySelector("#issues-container");
let limitWarningEl = document.querySelector("#limit-warning");

var displayWarning = function(repo) {
    limitWarningEl.textContent = "to see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
};

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        }
        if (response.headers.get("link")) {
            displayWarning(repo);
        }
        else {
            alert("Oh noez! Tere was a wittle pwoblem woblem! wuh-ohz! ◔w◔");
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "this repo has no open issues";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        issueContainerEl.appendChild(issueEl);

        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issueEl.appendChild(titleEl);
    
        var typeEl = document.createElement("span");
    
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
    
        issueEl.appendChild(typeEl);
    }
};

getRepoIssues("facebook/react");