<h2 align="center">ElementVisibilityWatcher</h2>
<div align="center"> Element visibility watcher utilising Intersection Observer API. </div>
<br />

An Callback or Event is triggered when there is a change in visibility state of an Element.

#### Vanilla JS Usage:

Example [fiddle](http://jsfiddle.net/reddyp/vz1Ljmew/11/)

```javascript
  import ElementVisibilityWatcher from 'element-visibility-watcher'
  
  // options are optional. By the default it will listen for elements inside the parent document
  let observer = new ElementVisibilityWatcher(options)
  
  let nodeToWatch = document.getElementById('thumbnail')
  observer.watch(nodeToWatch, function(visible, data) {
    console.log(data)
  })
```
Check [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer) for available `options` and `data` values.

#### Ractive JS Usage:
The library registers viewport event when it is loaded. Event listener can be added using `on-viewport` like below

Example [fiddle](http://jsfiddle.net/reddyp/29axokfg/14/)

```javascript
  import 'element-visibility-watcher'
  
  const ractive = new Ractive({
    el: "#body",
    template: "#scroller",
    data: {
      list: dummyData
    },
    visibilityCheck: function(event) {
      console.log(event.original.intersectionData, event.original.visible)
    }
  })
  
  // in HTML:
  <div on-viewport="@this.visibilityCheck(event)"></div>
```

Check [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer) for available `data` values.

*Note*: The bundle contains Intersection Observer API [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill). Please check Intersection Observer API & Polyfill limitations.
