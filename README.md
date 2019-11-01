# "Countdown" jQuery plugin
Plugin developed to create delayed page interactions, promote marketing call-to-actions, and other timed applications.

## Built with
* [jQuery (2.1.1)](https://code.jquery.com/jquery-2.1.1.min.js)

## Usage
### Invocation
#### Direct invocation 
Direct call to the plugin supplying only the required jQuery element identifier.
```
$.Countdown('#my-countdown-element');
```

#### Direct invocation with custom properties
Direct call to the plugin supplying the required jQuery element identifier as well as custom properties to extend the [API](#api).
```
$.Countdown('#my-countdown-element', {
    behavior:           'timer',
    time:               60,
    expirationMessage:  'Times up!'
});
```

#### Function expression
The plugin can be stored in a variable to be referenced throughout the application. This method of invocation allows for further use of the "Functions" [API](#api).
```
var MyCountdown = $.Countdown('#my-countdown-element', {
    behavior: 'timer',
    time:     360
});
```

### API
#### Properties
* ***behavior*** (string) (Default: "timer")\
Sets the countdown behavior. Accepts values **"timer"** and **"clock"**.

* ***date*** (string) (Default: null)\
Accepts a **"mm/dd/yyyy"** date format only when the "behavior" property is set to **"clock"**.

* ***time*** (int | string) (Default: 60)\
Accepts a **"hh:mm:ss"** time format when the "behavior" property is set to **"clock"**. Accepts an integer value for total number of seconds when the "behavior" property is set to **"timer"**.

* ***showStamps*** (bool) (Default: true)\
Setting to allow stamps to be appended to all time units.

* ***stampFormat*** (string) (Default: "short")\
Sets the display format for time unit stamps. Set to **"full"** to display stamps in full context (ex: "hours"); **"short"** to display stamps as abbreviations (ex: "hrs"); **"simple"** to display stamps as single-letter references (ex: "h").

* ***expirationMessage*** (string) (Default: "EXPIRED")\
Accepts a simple string of text or HTML to be displayed when the countdown has completed if the "onComplete" property has not be set.

* ***onComplete*** (function) (Default: null)\
Accepts a function to chain additional functionality once the countdown has completed. Overrides the "expirationMessage" property.

* ***callback*** (function) (Default: null)\
Accepts a function to chain additional functionality after the plugin has been successfully invoked.

#### Functions
* ***fn.stop()***\
Cancels the current countdown internval for a specified element.
```
# Invoke plugin via function expression
var MyCountdown = $.Countdown('#my-countdown-element');

# Custom click event
$('#stop-countdown').click(function(e){
    MyCountdown.fn.stop();
});
```