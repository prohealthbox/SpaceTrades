if (Meteor.isClient) {

  Template.ModalListingDelete.events({
    'click #profileDelete ': function() {
      var id = Session.get('listingSelected')._id;
      var creator_id = Session.get('listingSelected').creator_id;

      var options = {
        id: id,
        creator_id: creator_id
      }
      Meteor.call('removeListing', options);
      $("#listingDeleteModal").modal('toggle');

      sweetAlert({
        title: "Listing Removed",
        type: "success",
        timer: 2000,
        showConfirmButton: false
      });
      // Router.go("/");

    }
  });

}
