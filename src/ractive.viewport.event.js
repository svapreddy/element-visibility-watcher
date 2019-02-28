import ElementVisibilityObserver from './visibility.observer'

let visibilityObserver = new ElementVisibilityObserver()

const viewport = (node, fire) => {
  visibilityObserver.watch(node, (visible, data) => {
    fire({
      node: node,
      original: {
        visible: visible,
        intersectionData: data
      }
    })
  })
  return {
    teardown: () => {
      visibilityObserver.unwatch(node)
    }
  }
}

if (window.Ractive) {
  window.Ractive.events.viewport = viewport
}
