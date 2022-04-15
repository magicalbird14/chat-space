class UsersController < ApplicationController

  def index
    # 以下はmodelに移動する。
    # return nil if params[:keyword] == ""
    # "%#{params[:keyword]}%"で任意の0文字以上の文字列を検索
    # .where.not(id: current_user.id)でログインユーザを除く。除外したい場合に使う。
    # .limit(10)でで検索取得件数
    # 以下はmodel以降することにより書き換える。
    # @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    @users = User.search(params[:keyword], current_user.id)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
