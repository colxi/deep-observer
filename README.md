![logo](https://cdn.rawgit.com/colxi/deep-observer/37e057bb/logo.png)

# Deep Observer
[![NoDependencies](https://img.shields.io/badge/dependencies-none-green.svg)](https://github.com/colxi/midi-parser-js)
[![Browser](https://img.shields.io/badge/browser-compatible-blue.svg)](https://github.com/colxi/midi-parser-js)
[![Node](https://img.shields.io/badge/node-compatible-brightgreen.svg)](https://www.npmjs.com/package/midi-parser-js)

Tiny **Object Observe** library (<100 bytes gziped), to deep watch and track chages in Objects and Arrays. The provided callback to the constuctor is executed each time a change is deteced, passing a complete set of data relative to the detected change

 
- Deep Observation ( nested Objects )
- Based in Proxies (ES6) and WeakSets (ES6)
- Compatible with Node and Browser
- Compatible with all JS primitive types
- Wide support in Browsers : 
-- Chrome 49
-- Firefox 34
-- Edge 12
-- Opera 36
-- Safari 10

## Syntax
When at least two arguments are passed, it behaves as a Constructor :
> new Observer( object , callback [, id] )

`object`: Object to observe
`callback` : Function to be invoked on object changes
`id` : (optional) String to associate to the Observable

Returns an Observable (Proxy)

---
When only a String is provided it behaves as a getter :
> Observer( id )

`ìd`: String used as id in the constructor

Returns the matching Observable (Proxy)



## Usage example 

Provide to the constructor an object and a callback, and perform a change on the object, to trigger the callback : 

```
   const myObserved = new Observer( { a : 12 } , e=>console.log('changed!' , e) ),
   myObserved.a = 14; 
   // console outputs : 'changed!' { action:'update', oldValue:12, object:{a:14}, name:'a' }
```

## Package distribution :

In browser enviroment you can include this library using the jsdelivr CDN ...

```<script src='https://cdn.jsdelivr.net/gh/colxi/deep-observer/src/deep-observer.min.js'></script>```

If you are in the NodeJs enviroment, can install the package via:

```$ npm install deep-observer```


## Licence 
GPL 3