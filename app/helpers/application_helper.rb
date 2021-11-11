module ApplicationHelper
  def svelte_component(component_name, props = {}, options = {}, content = nil)
    component_name.split("_").first
    tag = options.delete(:tag) || :div
    data = { data: { "svelte-component" => component_name, "svelte-props" => props.to_json } }

    content_tag(tag, content, options.deep_merge(data))
  end

  alias svelte svelte_component
end
