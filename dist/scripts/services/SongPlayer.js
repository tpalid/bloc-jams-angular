(function() {
    function SongPlayer($rootScope, Fixtures) {
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
                stopSong();
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        };
        
        /**
         * @function playSong
         * @desc Calls buzz play method on currentBuzzObject, sets playing property of song to true
         * @param {Object} song
         */
        var playSong = function() {
            currentBuzzObject.play();
            SongPlayer.currentSong.playing = true;
        };
        
        /**
         * @function getSongIndex
         * @desc returns index of current song
         * @param {Object} song
         * @returns {String} number
         */
         
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
      
        /**
         * @desc Current song playing, from Fixtures
         * @type {Object}
         * @param {Object} song
        */
        
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = false;
        };
         
        SongPlayer.album = currentAlbum;
      
        SongPlayer.currentSong = null;
        /** 
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
        SongPlayer.currentTime = null;
        
        SongPlayer.volume = null;
        
         /**
         * @function SongPlayer.play
         * @desc If song clicked on isn't currentSong, calls setSong to set new song and plays the song; if song clicked in currently paused song, plays the song
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong();
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong();
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
        };
        
        /**
         * @function SongPlayer.previous
         * @desc plays previous song and resets current song to previous song
         */
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong();
            } else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong();
            }
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length) {
                var song = currentAlbum.songs[0];
                setSong(song);
                playSong(song);
            } else {
                song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
    
        };
        
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };
        return SongPlayer; 
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope','Fixtures', SongPlayer]);
})();