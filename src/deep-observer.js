(function(){
    'use strict';

    /**
     * OBSERVED Object contains all the Observable generated proxies. The generated
     * or provided ID NAME is used as the index
     */
    const OBSERVED = {};

    /**
     * OBSERVED_WS WeakSet containing all the weak references to all the active
     * Observables (and inner observed Objects and Arrays). This lets detect when a
     * reference to something already observed be reused
     */
    const OBSERVED_WS = new WeakSet();

    /**
     * isObjLiteralOrArray : Modified version to include arrays, taken from :
     * https://stackoverflow.com/questions/1173549/]
     *
     * Arguments:
     *     _obj         Item to analyze
     *
     * Return:
     *     Boolean
     *
     */
    const isObjLiteralOrArray = function(_obj){
        var _test  = _obj;
        return (  typeof _obj !== 'object' || _obj === null ?
            false :
            (
                (function () {
                    if( Array.isArray(_obj) ) return true;
                    while (!false) {
                        if (  Object.getPrototypeOf( _test = Object.getPrototypeOf(_test)  ) === null) {
                            break;
                        }
                    }
                    return Object.getPrototypeOf(_obj) === _test;
                })()
            )
        );
    };


    /**
     * newObserver
     * @param  {[newObservertype]}   modelContents [description]
     * @param  {[type]}   keyPath       [description]
     * @param  {Function} callback      [description]
     * @return {[type]}                 [description]
     */
    const newObserver = function( value, keyPath, callback){
        let result;

        if( OBSERVED_WS.has(value) ){
            // IGNORE ASIGNEMENT
            // provided item is a reference of somthing already observed.
            // return the same item, instead of a new one
            result = value;
        }else{
            // PERFORM ASIGNEMENT
            // item is a new reference not yet observed, create new proxy

            //
            let _target =  Array.isArray(value) ? []:{};

            let ObserbableObject =  new Proxy( _target , {
                set : function(target, property, value){
                    // save old value and detect action type
                    let oldValue = target[property];
                    let action = target.hasOwnProperty(property) ? 'update' : 'add';

                    // if performing an update and new value equals old value,
                    // no action is required, becacause no changes are being applied
                    if( action === 'update' && oldValue===value ) return true;

                    if( isObjLiteralOrArray(value) ){
                        // if value to SET is an Object or Array, create a new
                        // proxy, with updated keypath
                        target[property] = newObserver(value , keyPath+'.'+property,callback);
                    }else{
                        // anything else, set the new value
                        target[property] = value;
                    }

                    // invoke the callback
                    callback({action:action, keyPath:keyPath, object: target, name:property, oldValue : oldValue});
                    return true;
                },

                deleteProperty(target, property) {
                    let oldValue = target[property];
                    delete target[property];
                    // invoke the callback
                    callback({action:'delete', keyPath:keyPath, object: target, name:property, oldValue : oldValue});
                    return true;
                },

                get : function(target, property){
                    //
                    return target[property];
                }
            });

            // assign the properties to the ObserbableObject
            Object.assign( ObserbableObject, value );
            // add the object to the observed objects
            OBSERVED_WS.add(ObserbableObject);

            result = ObserbableObject;
        }

        return result;
    };

    /**
     * [Observer description]
     * @param {Object} conf [description]
     */
    const Observer = function( object , callback , id ){
        object = object || undefined;
        id = id || 'OBSERVED-'+Math.floor( Math.random()* Date.now() );

        // if callback are provided, behave as a setter
        if(arguments.length > 1){
            // validate input
            if(!(this instanceof Observer) ) throw new Error('Observer must be called with "new" when used as constructor');
            if( !isObjLiteralOrArray(object) ) throw new Error('First argument must be an Object or an Array');
            if(typeof callback !== 'function') throw new Error('Second argument (callback) must be a function.');
            // create Observer
            OBSERVED[id] = newObserver(object, id , callback || new Function());
        }

        return OBSERVED[id];
    };


    // done!
    if (typeof module !== 'undefined' && module.exports) module.exports = Observer;
    else window.Observer = Observer;

})();

