'use strict';

// This module is an adapted version from rails-ujs module
// implemented in http://github.com/reactjs/react-rails
// which is distributed under Apache License 2.0

interface BrowserWindow extends Window {
  Turbo?: unknown;
}

const ujs = {
  handleEvent(eventName, callback, { once } = { once: false }) {
    document.addEventListener(eventName, callback, { once });
  },

  setup(onMount, onUnmount) {
    const { Turbo } = window as BrowserWindow;

    if (typeof Turbo !== "undefined") {
      this.turboDrive(onMount, onUnmount)
    }
    this.native(onMount);
  },

  turboDrive(onMount, onUnmount) {
    this.handleEvent('turbo:load', onMount, { once: true });
    this.handleEvent('turbo:render', onMount);
    this.handleEvent('turbo:before-render', onUnmount);
  },

  native(onMount) {
    document.addEventListener('DOMContentLoaded', onMount);
  }
};

const ELEMENT_PREFIX = 'svelte-';
const PROPS_ATTRIBUTE_NAME = 'data-props';

const noop = () => {};

const ViteSvelte = {
  registeredComponents: {},

  /**
   * @param {Element} node
   */
  render(node, Component) {
    const propsJson = node.getAttribute(PROPS_ATTRIBUTE_NAME);
    const props = propsJson && JSON.parse(propsJson);
    node.innerHTML = null;
    new Component({
      target: node,
      props
    });
  },

  registerComponents(components) {
    // const collisions = intersection(
    //   Object.keys(this.registeredComponents),
    //   Object.keys(components)
    // );
    // if (collisions.length > 0) {
    //   console.error(
    //     `vite-svelte: can not register components. Following components are already registered: ${collisions}`
    //   );
    // }

    this.registeredComponents = components;

    // assign(this.registeredComponents, omit(components, collisions));
    return true
  },

  mountComponents() {
    const { registeredComponents } = this;
    Object.keys(registeredComponents).forEach((componentName) => {
      let toMount = document.querySelectorAll(`${ELEMENT_PREFIX}${componentName.toLowerCase()}`)

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
            `vite-svelte: can not render a component that has not been registered: ${componentName}`
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

