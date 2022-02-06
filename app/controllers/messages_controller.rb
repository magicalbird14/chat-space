class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.json
      # redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
      # redirect_to :index　//同一controller類ではない移動の際はこちらを使う。
      # render:ファイルを直接読み込みにいく。
      # redirect_to:ルーティングへ飛ぶ。
      # どちらでも動くがシンプルな方が良い。
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
