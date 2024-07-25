class Admin::UsersController < ApplicationController
  before_action :prepare_user_params, only: :create

  def create
    @user = User.new(user_params)
    authorize @user

    respond_to do |format|
      if @user.save
        format.json { render json: @user, status: :created }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def user_params
    surveyor_params = [:city, :email, :firstname, :lastname, :phone, :state, :street_address,
      :zipcode]

    params.require(:user).permit(:email, :role, surveyor_attributes: surveyor_params)
  end

  def prepare_user_params
    if params[:user].present?
      params[:user][:surveyor_attributes] = params[:user].delete(:surveyor)

      # For now we have email on User and Surveyor, which we are unsure yet if it is redundant
      # In the meantime, copy email from User onto Surveyor
      if params[:user][:surveyor_attributes].present?
        params[:user][:surveyor_attributes][:email] ||= params[:user][:email]
      end
    end
  end
end