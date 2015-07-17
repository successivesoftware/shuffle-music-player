// this file contains the models/collections in needed by the player

var PlaylistCollection = Backbone.Collection.extend({
  comparator: function(playlist){
    return [playlist.get("editable"), playlist.get('title')];
  },
  fetch: function(options){
    socket.emit('fetch_playlists');
  },
  getByTitle: function(name){
    for(var i = 0; i < this.models.length; i++){
      if(this.models[i].attributes.title == name){
        return this.models[i];
      }
    }
    return false;
  },
  getBy_Id: function(id){
    for(var i = 0; i < this.models.length; i++){
      if(this.models[i].attributes._id == id){
        return this.models[i];
      }
    }
    return false;
  }
});

var SongCollection = Backbone.Collection.extend({
  fetch: function(options){
    socket.emit('fetch_songs');
  },
  findBy_Id: function(id){
    for(var i = 0; i < this.models.length; i++){
      if(this.models[i].attributes._id == id){
        return this.models[i];
      }
    }
    return false;
  },
  getByIds: function(playlist){
    if(playlist !== undefined && playlist.songs !== undefined){
      if(playlist._id == "QUEUE"){
        return (player.shuffle_state) ? player.shuffle_pool : player.queue_pool;
      }
      songs = [];
      for(var i = 0; i < playlist.songs.length; i++){
        var song = this.findBy_Id(playlist.songs[i]._id);
        if(song){
          // set the index in the playlist
          song.attributes.index = i+1;
          songs.push(song);
        }
      }
      return songs;
    }
    return false;
  },
  findItem: function(item){
    for(var i = 0; i < this.models.length; i++){
      if(this.models[i].attributes.title == item.attributes.title &&
        this.models[i].attributes.album == item.attributes.album &&
        this.models[i].attributes.display_artist == item.attributes.display_artist){
        return this.models[i];
      }
    }
    return false;
  }
});
