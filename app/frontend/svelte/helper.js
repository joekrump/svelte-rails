'use strict';

// This module is an adapted version from rails-ujs module
// implemented in http://github.com/reactjs/react-rails
// which is distributed under Apache License 2.0

const ujs = {
  handleEvent(eventName, callback, { once } = { once: false }) {
    const $ = typeof window.jQuery !== 'undefined' && window.jQuery;

    if ($) {
      if (once) {
        $(document).one(eventName, callback);
      } else {
        $(document).on(eventName, callback);
      }
    } else {
      document.addEventListener(eventName, callback, { once });
    }
  },

  setup(onMount, onUnmount) {
    const $ = typeof window.jQuery !== 'undefined' && window.jQuery;
    const { Turbolinks } = window;

    // Detect which kind of events to set up:
    if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
      if (typeof Turbolinks.EVENTS !== 'undefined') {
        // Turbolinks.EVENTS is in classic version 2.4.0+
        this.turbolinksClassic(onMount, onUnmount);
      } else if (typeof Turbolinks.controller !== 'undefined') {
        // Turbolinks.controller is in version 5+
        this.turbolinks5(onMount, onUnmount);
      } else {
        this.turbolinksClassicDeprecated(onMount, onUnmount);
      }
    } else if ($ && typeof $.pjax === 'function') {
      this.pjax(onMount, onUnmount);
    } else {
      this.native(onMount);
    }
  },

  turbolinks5(onMount, onUnmount) {
    this.handleEvent('turbolinks:load', onMount, { once: true });
    this.handleEvent('turbolinks:render', onMount);
    this.handleEvent('turbolinks:before-render', onUnmount);
  },

  turbolinksClassic(onMount, onUnmount) {
    const { Turbolinks } = window;

    this.handleEvent(Turbolinks.EVENTS.CHANGE, onMount);
    this.handleEvent(Turbolinks.EVENTS.BEFORE_UNLOAD, onUnmount);
  },

  turbolinksClassicDeprecated(onMount, onUnmount) {
    // Before Turbolinks 2.4.0, Turbolinks didn't
    // have named events and didn't have a before-unload event.
    // Also, it didn't work with the Turbolinks cache, see
    // https://github.com/reactjs/react-rails/issues/87
    const { Turbolinks } = window;
    Turbolinks.pagesCached(0);
    this.handleEvent('page:change', onMount);
    this.handleEvent('page:receive', onUnmount);
  },

  pjax(onMount, onUnmount) {
    this.handleEvent('ready', onMount);
    this.handleEvent('pjax:end', onMount);
    this.handleEvent('pjax:beforeReplace', onUnmount);
  },

  native(onMount) {
    const $ = typeof window.jQuery !== 'undefined' && window.jQuery;
    if ($) {
      $(() => onMount());
    } else if ('addEventListener' in window) {
      document.addEventListener('DOMContentLoaded', onMount);
    } else {
      // add support to IE8 without jQuery
      window.attachEvent('onload', onMount);
    }
  }
};

const ELEMENT_PREFIX = 'svelte-';
const PROPS_ATTRIBUTE_NAME = 'data-svelte-props';

const noop = () => {};

const ViteSvelte = {
  registeredComponents: {},

  render(node, Component, innerContent) {
    const propsJson = node.getAttribute(PROPS_ATTRIBUTE_NAME);
    const props = propsJson && JSON.parse(propsJson);
    node.innerHTML = null;
    new Component({
      target: node,
      props
    });

    if (innerContent !== undefined) {
      node.firstElementChild.append(innerContent);
    }

    node.replaceWith(node.firstElementChild);
  },

  registerComponents(components) {
    // const collisions = intersection(
    //   Object.keys(this.registeredComponents),
    //   Object.keys(components)
    // );
    // if (collisions.length > 0) {
    //   console.error(
    //     `webpacker-svelte: can not register components. Following components are already registered: ${collisions}`
    //   );
    // }
    this.registeredComponents = components;

    // assign(this.registeredComponents, omit(components, collisions));
    return true
  },

  mountComponents() {
    const { registeredComponents } = this;
    let toMount = [];
    Object.keys(registeredComponents).forEach((componentName) => {
      toMount = document.querySelectorAll(`${ELEMENT_PREFIX}${componentName.toLowerCase()}`)

      for (let i = 0; i < toMount.length; i += 1) {
        const node = toMount[i];
        const component = registeredComponents[componentName];

        if (component) {
          if (node.innerHTML.length === 0) {
            this.render(node, component);
          } else {
            this.render(node, component, node.innerHTML);
          }
        } else {
          console.error(
            `vite-svelte: can not render a component that has not been registered: ${className}`
          );
        }
      }
    });
  },

  setup(components = {}) {
    if (typeof window.ViteSvelte === 'undefined') {
      window.ViteSvelte = this;
      ujs.setup(this.mountComponents.bind(this), noop);
    }

    window.ViteSvelte.registerComponents(components);
    window.ViteSvelte.mountComponents();
  }
};

export default ViteSvelte;

