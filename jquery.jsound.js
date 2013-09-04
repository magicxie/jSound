/**
 * jQuery extended sound plugin (no flash)
 * 
 * jQuery JSound Version 1.0
 *
 * based on jquery.sound.js by Jörn Zaefferer
 * Ramakrishna Anand.J
 * Licensed under the GNU GENERAL PUBLIC LICENSE:
 * http://opensource.org/licenses/GPL-3.0
 */
/**
 * API Documentation
 * 
 * // play a sound from the url
 * var sound = $.sound(url);
 * sound.play();
 * 
 * 
 * // mute a sound 
 * sound.mute();
 * 
 * // unmute a sound
 * sound.unmute();
 * 
 */

(function($) {

    var Sound = function(url, options){
      
        this.url = url;
        this.options = options;
        /*$.support.leadingWhitespace IE6-8*/
        this.wrapElement = (!$.support.leadingWhitespace) ? $('<bgsound id="s" volume="10000" />').attr({
                            src: url + '.wav',
                            loop: 1,
						    autostart: true
                          })
                            : $('<audio style="height:0" ><source src="'+ url +'.wav" type="audio/wave" /><source src="'+ url +'.mp3" type="audio/mp3" /><source src="'+ url +'.ogg" type="audio/ogg" /></audio>');                          
        
        if(typeof Sound._init == 'undefined'){
                
            /*mute*/    
            var _mute = false;    
            
            $.sound.mute = Sound.prototype.mute = (function(){
                return function(){_mute = true; return _mute;}
            })();
            
            $.sound.unmute = Sound.prototype.unmute = (function(){
                return function(){_mute = false; return _mute;}
            })();
            
            $.sound.toogleMute = Sound.prototype.toogleMute = (function(){
                return function(){_mute = !_mute; return _mute;}
            })();
            
            $.sound.isMute = Sound.prototype.isMute = (function(){
                return function(){return _mute;}
            })();
                
            /*sound cache*/
            var _cache = {};
            Sound.prototype.cache = (function(){          
                return function(){
                    return _cache;
                };
            })();    
                       
            
            Sound.prototype.playIE = function(){
              
              var src = this.wrapElement.attr('src');
              this.wrapElement.attr('src', '');
              this.wrapElement.attr('src', src);
            }
            
            Sound.prototype.playH5 = function(){
                this.wrapElement[0].play();
            }
            
             /*play*/
            Sound.prototype.play = function(url){

                if(url === undefined){
                    
                }else{
                    this.url = url;
                }
                
                if(!this.cache()[this.url]){
                  this.wrapElement.appendTo('body');
                  //console.log(this.cache())
                  this.cache()[this.url] = true;
                }
                
                if(!_mute){          
                 
                  
                 if((!$.support.leadingWhitespace)){
                    this.playIE();
                 }else{
                    this.playH5();
                 }
                 
                }                       
            }
            
            //end init
            Sound._init = true;        
        }

        //return this;
        
    }

    $.sound = function(url){
        return new Sound(url);
    }
    
})(jQuery);
