class HomeController < ApplicationController
  def index
    @data = { title: "Svelte Client-side rendered Component 🌴" }
  end
end
