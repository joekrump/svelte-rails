/*
 * If you want to be able to use a svelte component (.svelte) in a .html.erb file
 * you must add the component to the object that is passed to ViteSvelte.setup()
 *
 * To use the component in a .html.erb file, use a custom element tag that begins with <svelte-.
 *
 * Ex <svelte-home></svelte-home>
 *
 * If you want to pass the component properties, assign a JSON formatted string value to the element's
 * data-props attribute.
 *
 * Ex. <svelte-home data-props="<%= @a_value_from_rails.to_json %>"></svelte-home>
 *
 * Each key in the JSON will map onto a property name of the svelte component it is passed to.
 * For example, if <svelte-home> has a prop: "name" (export let name;), then a JSON formatted string of
 * "{ 'name': 'Svelte' }" that is assigned to data-props, will result in the "name" prop, getting
 * assigned the value 'Svelte'.
 */

import ViteSvelte from "./helper";

import home from "./views/home.svelte";

ViteSvelte.setup({
  home,
});
