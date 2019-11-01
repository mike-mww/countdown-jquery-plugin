( function($){
    $.extend({
        Countdown: function(element, customizations){
            var properties = $.extend(true, {
                    behavior:           'timer',    // clock, timer
                    date:               null,       // mm/dd/yyyy (clock only)
                    time:               60,         // clock (hh:mm:ss) / timer (in seconds)
                    showStamps:         true,
                    stampFormat:        'short',    // full ("hours"), short ("hrs"), simple ("h")
                    expirationMessage:  'EXPIRED',
                    onComplete:         null,       // function executed when countdown has completed
                    callback:           null        // function executed when successfully invoked
                }, customizations);

            var output = {
                init: function(){
                    this.ui.build();
                },

                cache: {
                    continue: true,
                },

                ui: {
                    build: function(){
                        if ( $(element).length > 0 ) {
                            if (properties.behavior == 'timer' || properties.behavior == 'clock') {
                                if (properties.date == null) {
                                    var currDate = new Date();
    
                                    properties.date = (currDate.getMonth() + 1) + '/' + currDate.getDate() + '/' + currDate.getFullYear();
                                }

                                var getBehavior = ((properties.behavior == 'timer' || properties.behavior == 'clock' && properties.date == null) ? 'timer' : 'clock'),
                                    timeCode    = (getBehavior == 'timer') 
                                                    ? (properties.time * 1000) + new Date().getTime() 
                                                    : new Date( properties.date + (properties.time != null ? ' ' + properties.time : '') ).getTime();

                                var counter = setInterval(function(){
                                    var now         = new Date().getTime(),
                                        distance    = (getBehavior == 'timer')
                                                        ? Math.round((timeCode - now) / 1000) * 1000
                                                        : (timeCode - now),
                                        timeCalc    = {};

                                    timeCalc.d = Math.floor(distance / (1000 * 60 * 60 * 24)),
                                    timeCalc.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                                    timeCalc.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                                    timeCalc.s = Math.floor((distance % (1000 * 60)) / 1000);

                                    if (!output.cache.continue || distance < 0) {
                                        clearInterval(counter);
                                    } else {
                                        var stamps      = [],
                                            timestamp   = '',
                                            ts          = 0;

                                        if (properties.stampFormat == 'full' || properties.stampFormat == 'short') {
                                            var d_str = 'day',
                                                h_str = ( (properties.stampFormat == 'full') ? 'hour' : 'hr' ),
                                                m_str = ( (properties.stampFormat == 'full') ? 'minute' : 'min' ),
                                                s_str = ( (properties.stampFormat == 'full') ? 'second' : 'sec' );
                                            
                                            d_str += ((timeCalc.d != 1) ? 's' : '');
                                            h_str += ((timeCalc.h != 1) ? 's' : '');
                                            m_str += ((timeCalc.m != 1) ? 's' : '');
                                            s_str += ((timeCalc.s != 1) ? 's' : '');
                                            
                                            stamps.push(d_str);
                                            stamps.push(h_str);
                                            stamps.push(m_str);
                                            stamps.push(s_str);
                                        }

                                        $.each(timeCalc, function(k, v){
                                            if (properties.behavior == 'clock' || properties.behavior === 'timer' && v > 0 || k == 's') {
                                                timestamp += '<span class="timestamp timestamp-' + k + '">';
                                                timestamp += '<span class="digits">' + v + '</span>';

                                                if (properties.showStamps) {
                                                    timestamp += '<span class="stamp">';
                                                    timestamp += ( (stamps.length) ? stamps[ts] : k );
                                                    timestamp += '</span>';
                                                }

                                                timestamp += '</span>';
                                            }
                                            
                                            ts++; 
                                        });

                                        $(element).html(timestamp);
                                    }
                                
                                    if (distance < 0) {
                                        if (properties.onComplete != null && typeof properties.onComplete === 'function') {
                                            properties.onComplete();
                                        } else {
                                            $(element).html(properties.expirationMessage);
                                        }
                                    }
                                }, 1000);

                                if (properties.callback != null && typeof properties.callback === 'function') {
                                    properties.callback();
                                }

                            }
                        }
                    },

                },

                fn: {
                    stop: function(){
                        output.cache.continue = false;
                    },
                },

            }

            output.init();
            return output;
        }
    });
}(jQuery) );
