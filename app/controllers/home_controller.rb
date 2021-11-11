class HomeController < ApplicationController
  def index
    @data = { name: "Svelte ⛱" }
  end
end
