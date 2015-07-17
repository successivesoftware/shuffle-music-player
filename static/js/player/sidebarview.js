SettingsBarView = Backbone.View.extend({
  template: "#settings_bar_template",
  render: function(){
    this.$el.html(render(this.template, {vol: 100}));
    _.defer(function(){
      var volElem = $("#vol_bar");
      if(volElem.length > 0){
        player.setVolElem(volElem);
      }
    });
  },
  events: {
    "click #remote_setup": "openOptions"
  },
  openOptions: function(){
    bootbox.dialog({
      message: render("#control_template", { comp_name: player.comp_name, host: window.location.host }),
      title: "Setup Remote Control",
      buttons: {
        danger: {
          label: "Cancel",
          className: "btn-danger"
        },
        success: {
          label: "Save",
          className: "btn-success",
          callback: function() {
            comp_name = $("#comp_name_input").val();
            player.setCompName(comp_name);
          }
        }
      }
    });
  }
});

InfoView = Backbone.View.extend({
  template: "#current_info_template",
  render: function(){
    this.$el.html(render(this.template, player.current_song));
  },
  events: {
    "click .colsearch": "triggerSearch",
    "click .info_cover": "triggerCover",
    "click .info_options": "triggerOptions"
  },
  triggerCover: function(ev){
    showCover($(ev.target).attr('src'));
    return false;
  },
  triggerOptions: function(ev){
    if(!optionsVisible){
      addToSelection(player.playing_id, false);
      createOptions(ev.clientX, ev.clientY);
    }
    return false;
  },
  triggerSearch: function(ev){
    search = $(ev.target).text();
    player.updateSearch(search);
  }
});
