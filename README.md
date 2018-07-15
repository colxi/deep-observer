![logo](https://cdn.rawgit.com/colxi/deep-observer/37e057bb/logo.png)

# Deep Observer
[![NoDependencies](https://img.shields.io/badge/dependencies-none-green.svg)](https://github.com/colxi/midi-parser-js)
[![Browser](https://img.shields.io/badge/browser-compatible-blue.svg)](https://github.com/colxi/midi-parser-js)
[![Node](https://img.shields.io/badge/node-compatible-brightgreen.svg)](https://www.npmjs.com/package/midi-parser-js)

Tiny **Object Observe** library ( < 100bytes gziped), to deep watch and track changes in Objects and Arrays. The provided callback to the Constuctor is executed each time a change is deteced, recieving a complete set of data relative to the detected change.


 
- Deep Observation ( configurable Depth )
- Optional construction observe
- Compatible with all JS primitive types
- No dependencies
- Wide platform support : 
  - Node 
  - Chrome 49
  - Firefox 34
  - Edge 14
  - Opera 36
  - Safari 10

## Syntax

### 1. Constructor
When at least two arguments are passed to `Observer()` , it behaves as a Constructor :
> **new Observer( object , callback [, config] )**

- **`object`**: Object to observe
- **`callback`** : Function to be invoked on object changes
- **`config`** : (optional) Object
  - **`id`** : String to use as identifier to the Observable. (if not provided is generated automatically)
  - **`observeConstruction`** : Boolean. If true callback will be executed also in construction stage. (default: false)
  - **`depth`** : Integer. Sets the observing depth limit. When set to 0, no limit is applied (default : 0 )

**Returns** : an Observable (Proxy)

### 2. Getter 
When only a String is provided  to `Observer()` it behaves as a getter :
> **Observer( id )**

- **`ìd`**: String provided previously in the constructor config object

**Returns** : the matching Observable (Proxy) or undefined

### 3. Callback function

The function called each time changes are made, will receive an event object containng the following properties :

- **`action`** : String containing one of the following values : add|update|delete
- **`object`**: Affected property parent's Object
- **`name`**: Name of the modified property (or array index)
- **`oldValue`** : Value of the property before the change
- **`keypath`** : String representing the internal path to the affected property. 

## Basic usage example 

Provide to the constructor an `object` and a `callback`, and perform a change on the object, to  see how the `callback` is triggered: 

```javascript
   // create an observable object
   const myObserved = new Observer( { a : 12 } , e=>console.log('changed!' , e) ),
   // perform a modification
   myObserved.a = 14; 
   // console outputs : 'changed!' { action:'update', oldValue:12, object:{a:14}, name:'a' }
```

## Package distribution :

In browser enviroment you can include this library using the jsdelivr CDN ...

```
<script src='https://cdn.jsdelivr.net/gh/colxi/deep-observer@latest/src/deep-observer.min.js'></script>
```

If you are in the NodeJs enviroment, can install the package via:

```
$ npm install deep-observer --save
```


## Licence 
GPL 3
