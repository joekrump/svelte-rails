class HomeController < ApplicationController
  def index
    @data = { title: "Svelte Component 🌴" }
  end
end
