(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

       /**
        * @desc album object from fixture service
        * @type {Object}
        */
       
       var currentAlbum = Fixtures.getAlbum();
       
        /**
         * @desc Buzz object audio file
         * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        }
        
        /**
         * @function playSong
         * @desc Calls buzz play method on currentBuzzObject, sets playing property of song to true
         * @param {Object} song
         */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        
        /**
         * @function getSongIndex
         * @desc returns index of current song
         * @param {Object} song
         * @returns {String} number
         */
         
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }
      
        /**
         * @desc Current song playing, from Fixtures
         * @type {Object}
         * @param {Object} song
        */
          SongPlayer.currentSong = null;
        
         /**
         * @function SongPlayer.play
         * @desc If song clicked on isn't currentSong, calls setSong to set new song and plays the song; if song clicked in currently paused song, plays the song
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            console.log(song);
            console.log(SongPlayer.currentSong);
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        
        };
         
         /**
         * @function SongPlayer.pause
         * @desc Pauses currently playing song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }
        
        /**
         * @function SongPlayer.previous
         * @desc plays previous song and resets current song to previous song
         */
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        return SongPlayer; 
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();