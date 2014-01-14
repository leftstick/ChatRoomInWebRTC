<!doctype html>
<html lang="en" ng-app="Chat">
<head>
    <meta charset="UTF-8">
    <title>Chat Room</title>
    <% _.forEach(csss, function(css) { %><link rel="stylesheet" href="<%- css %>"><%- "\n" %><% }); %>
</head>
<body c-loader>
    <div ng-view></div>
</body>
</html>
<% _.forEach(scripts, function(script) { %><script type="text/javascript" src="<%- script %>"></script><%- "\n" %><% }); %>