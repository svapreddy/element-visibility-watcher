import 'intersection-observer'

class ElementVisibilityWatcher {
  constructor (observerOptions = {}) {
    this.observerOptions = Object.assign({
      root: null,
      rootMargin: '0px',
      threshold: 0.01
    }, observerOptions)
    this.visibleElementsStack = []
    this.observingElements = []
    this.observingElementsCallbacks = []
    this.initialize()
  }
  triggerCallbacks (cameIn, goneOut) {
    let observingElements = this.observingElements
    let observingElementsCallbacks = this.observingElementsCallbacks

    let cameInElements = cameIn.map((entry) => { return entry.target })
    let goneOutElements = goneOut.map((entry) => { return entry.target })

    observingElements.forEach((element, idx) => {
      let arg
      let entry
      let cameInElementsIdx = cameInElements.indexOf(element)
      let goneOutElementsIdx = goneOutElements.indexOf(element)

      if (cameInElementsIdx > -1) {
        arg = true
        entry = cameIn[cameInElementsIdx]
      }
      if (goneOutElementsIdx > -1) {
        arg = false
        entry = cameIn[goneOutElementsIdx]
      }
      if (arg !== undefined) {
        observingElementsCallbacks[idx](arg, entry)
      }
    })
  }
  observerCallback (entries) {
    let goneOut = []
    let cameIn = []
    entries.forEach((entry) => {
      let target = entry.target
      let idx = this.visibleElementsStack.indexOf(target)
      let isIntersecting = entry.isIntersecting
      if (!isIntersecting) {
        if (idx > -1) {
          goneOut.push(entry)
          this.visibleElementsStack.splice(idx, 1)
        }
      } else {
        if (idx === -1) {
          cameIn.push(entry)
          this.visibleElementsStack.push(entry.target)
        }
      }
    })
    this.triggerCallbacks(cameIn, goneOut)
  }
  initialize () {
    let cb = this.observerCallback.bind(this)
    this.visibilityObserver = new window.IntersectionObserver(cb, this.observerOptions)
  }
  watch (element, callback) {
    if (element && callback) {
      this.observingElements.push(element)
      this.observingElementsCallbacks.push(callback)
      this.visibilityObserver.observe(element)
    }
  }
  unwatch (element) {
    let idx = this.observingElements.indexOf(element)
    if (idx > -1) {
      this.observingElements.splice(idx, 1)
      this.observingElementsCallbacks.splice(idx, 1)
    }
  }
}

export default ElementVisibilityWatcher
