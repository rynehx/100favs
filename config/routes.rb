Rails.application.routes.draw do
    root "static_pages#root"
    get "callback",to: "static_pages#callback"
end
