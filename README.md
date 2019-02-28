<h2 align="center">ElementVisibilityWatcher</h2>
<div align="center"> Element visibility watcher utilising Intersection Observer API. </div>
<br />

#### Vanilla JS Usage:

```javascript
  import ElementVisibilityWatcher from 'element-visibility-watcher'
  let observer = new ElementVisibilityWatcher(options)
  
  let nodeToWatch = document.getElementById('thumbnail')
  observer.watch(nodeToWatch, function(visible, data) {
    console.log(data)
  })
```
Check [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer) for available `options` and `data` values.

#### Ractive JS Usage:
The library registers viewport event when it is loaded. Event listener can be added using `on-viewport` like below

```javascript
  import 'element-visibility-watcher'
  
  <div on-viewport="someFunc"></div>
  
  ractiveApp.on('someFunc', function(event){
     event.original.data
     event.original.visible // visibility state. true / false
  })
```

Check [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer) for available `data` values.

*Note*: The bundle contains Intersection Observer API [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill). Please check Intersection Observer API & Polyfill limitations.
