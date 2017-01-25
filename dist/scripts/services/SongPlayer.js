(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        /**
         * @desc Current song playing, from Fixtures
         * @type {Object}
        */
          var currentSong = null;
        
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
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
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
         * @function SongPlayer.play
         * @desc If song clicked on isn't currentSong, calls setSong to set new song and plays the song; if song clicked in currently paused song, plays the song
         * @param {Object} SongPlayer
         */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        
        };
         
         /**
         * @function SongPlayer.pause
         * @desc Pauses currently playing song
         * @param {Object} SongPlayer
         */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        }
        return SongPlayer; 
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();