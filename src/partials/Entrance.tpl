<!-- Modal -->
<div c-login class="modal fade" id="entrance" tabindex="-1" role="dialog" aria-labelledby="enLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title text-center text-info" id="enLabel">Choose what you like</h4>
      </div>
      <div class="modal-body">
          <input type="text" class="form-control" ng-model="nickname" placeholder="Enter your nickname...">
      </div>
      <div class="modal-footer" c-validate="nickname">
        <button type="button" class="btn btn-success entrance" disabled ng-click="Load('host')">Host</button>
        <button type="button" class="btn btn-warning entrance" disabled ng-click="Load('client')">Client</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->