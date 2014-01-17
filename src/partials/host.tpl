<div class="container">
    <div class="panel panel-default">
        <div class="panel-heading">Host: <span ng-bind="nickname"></span></div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-4 col-lg-4 col-sm-4">
                    <ul class="list-group">
                        <li class="list-group-item" ng-repeat="client in clients"><span ng-bind="client.nickname"></span></li>
                    </ul>
                </div>
                <div class="col-md-8 col-lg-8 col-sm-8">
                    <textarea class="form-control messageQueue disabled" rows="15"></textarea>
                    <div class="input-group">
                        <input type="email" class="form-control" placeholder="Type message...">
                        <span class="input-group-addon" c-tooltip="bottom" title="Press Enter to send message!"><span class="glyphicon glyphicon-edit"></span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-footer">Typing...</div>
    </div>
</div>