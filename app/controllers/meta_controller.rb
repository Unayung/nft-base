class MetaController < ApplicationController
  layout false

  def show
    request = Request.find_by(id: params[:id].to_i + 1)
    if request.present?
      json_string = {
        description: request.description,
        image: Rails.application.routes.url_helpers.url_for(request.file),
        name: request.name
      }.to_json
      render json: json_string
    else
      render json: { nil: 'true' }
    end
  end
end
