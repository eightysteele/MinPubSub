/*!
* MinPubSub
* Copyright(c) 2011 Daniel Lamb <daniellmb.com>
* MIT Licensed
*/

(function(d){
    var cache = d.c_ || {}, // topic/subscription hash, check for "c_" cache for unit testing
        publish = null,
        subscribe = null,
        unsubscribe = null;

	publish = function(/* String */ topic, /* Array? */ args){
		// summary: 
		//		Publish some data on a named topic.
		// topic: String
		//		The channel to publish on
		// args: Array?
		//		The data to publish. Each array item is converted into an ordered
		//		arguments on the subscribed functions. 
		//
		// example:
		//		Publish stuff on '/some/topic'. Anything subscribed will be called
		//		with a function signature like: function(a,b,c){ ... }
		//
		//		publish("/some/topic", ["a","b","c"]);
		
		var subs = cache[topic],
			len = subs ? subs.length : 0;

		//can change loop or reverse array if the order matters
		while(len--){
			subs[len].apply(d, args || []);
		}
	};

	subscribe = function(/* String */ topic, /* Function */ callback){
		// summary:
		//		Register a callback on a named topic.
		// topic: String
		//		The channel to subscribe to
		// callback: Function
		//		The handler event. Anytime something is publish'ed on a 
		//		subscribed channel, the callback will be called with the
		//		published array as ordered arguments.
		//
		// returns: Array
		//		A handle which can be used to unsubscribe this particular subscription.
		//	
		// example:
		//		subscribe("/some/topic", function(a, b, c){ /* handle data */ });

		if(!cache[topic]){
			cache[topic] = [];
		}
		cache[topic].push(callback);
		return [topic, callback]; // Array
	};

	unsubscribe = function(/* Array */ handle, /* Function? */ callback){
		// summary:
		//		Disconnect a subscribed function for a topic.
		// handle: Array
		//		The return value from a subscribe call.
		// example:
		//		var handle = subscribe("/some/topic", function(){});
		//		unsubscribe(handle);
		
		var subs = cache[callback ? handle : handle[0]],
			callback = callback || handle[1],
			len = subs ? subs.length : 0;
		
		while(len--){
			if(subs[len] === callback){
				subs.splice(len, 1);
			}
		}
	};

    d.mps = {};

    d.mps.Event = function(type, action, data) {
        if (!(this instanceof d.mps.Event)) {
            return new d.mps.Event(type, action, data);
        }
        this.getType = function() {
            return type;
        };
        this.getAction = function() {
            return action;
        };
        this.getData = function() {
            return data;
        };
        return this;
    };

    d.mps.create = function(type, action, data) {
        return new d.mps.Event(type, action, data);
    };
        
    d.mps.publish = function(event) {
        publish(event.getType(), [event]);
    };

    d.mps.subscribe = function(eventType, eventHandler) {
        subscribe(eventType, eventHandler);
    };

    d.mps.unsubscribe = unsubscribe;

})(this);