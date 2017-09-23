class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  private

  def sign_in!(user)
    if user_params[:username] == 'guest'
      session[:session_token] = user.session_token
    else
      session[:session_token] = user.reset_session_token!
    end
  end

  def sign_out!
    unless current_user.username == 'guest'
      current_user.reset_session_token!
    end
    session[:session_token] = nil
  end

  def current_user
    @current_user ||= session[:session_token] &&
        User.find_by(session_token: session[:session_token])
  end

  def user_params
    params.require(:user).permit(:username, :password, :displayname)
  end
end
