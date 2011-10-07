/**
 * This file defines a MinPubSub module for use with RequireJS apps.
 * 
 * @see http://requirejs.org
 *     
 */
define(
    [],
    function() {
        var cache = {}, 
            publish = null,
            subscribe = null,
            unsubscribe = null,
            mps = {};

	    publish = function(topic, args) {
		    var subs = cache[topic],
			    len = subs ? subs.length : 0;

		    while (len--) {
			    subs[len].apply(this, args || []);
		    }
	    };

	    subscribe = function(topic, callback) {
		    if (!cache[topic]) {
			    cache[topic] = [];
		    }
		    cache[topic].push(callback);
		    return [topic, callback];
	    };

	    unsubscribe = function(handle, callback) {
		    var subs = cache[callback ? handle : handle[0]],
			    cb = callback || handle[1],
			    len = subs ? subs.length : 0;
		    
		    while (len--) {
			    if (subs[len] === cb) {
				    subs.splice(len, 1);
			    }
		    }
	    };

        mps.Event = function(type, action, data) {
            if (!(this instanceof mps.Event)) {
                return new mps.Event(type, action, data);
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

        mps.create = function(type, action, data) {
            return new mps.Event(type, action, data);
        };        
        mps.publish = function(event) {
            publish(event.getType(), [event]);
        };
        mps.subscribe = function(eventType, eventHandler) {
            subscribe(eventType, eventHandler);
        };
        mps.unsubscribe = unsubscribe;        

        return mps;
    }
);