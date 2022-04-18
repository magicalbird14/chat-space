$(function () {
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="chat-main__messages-box" data-message-id=${message.id}>
        <div class="chat-main__messages-box__info">
          <div class="chat-main__messages-box__info__name">
            ${message.user_name}
          </div>
          <div class="chat-main__messages-box__info__daytime">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__messages-box__message">
          <p class="chat-main__messages-box__message__image">
            ${message.content}
          </p>
        </div>
          <img src=${message.image} >
      </div>`
      return html;
    } else {
      var html =
      `<div class="chat-main__messages-box" data-message-id=${message.id}>
         <div class="chat-main__messages-box__info">
           <div class="chat-main__messages-box__info__name">
             ${message.user_name}
           </div>
           <div class="chat-main__messages-box__info__daytime">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__messages-box__message">
          <p class="chat-main__messages-box__message">
            ${message.content}
          </p>
         </div>
      </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url, //同期通信でいう『パス』
      type: "POST",  //同期通信でいう『HTTPメソッド』
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html); //HTMLの内容を追加表示させる。
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('form')[0].reset();
      // $('').val(''); //テキスト入力欄を空白にする。
      // $('.chat-main__message-form__send').prop('disabled', false); //送信ボタンを活性化に戻す。
      // 上記既述だと失敗した場合にも書く必要があるので、.alwaysメソッドを使うのが良い。
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました。");
    })
    // alwaysメソッドは成功した時、失敗した時どちらでも作動するので、両方に書く必要がある時に便利。
    .always(function(){
      $('.chat-main__message-form__send').prop('disabled', false);
    });
//エラーの確認はcreate.json.jbuilderを弄ってエラ〜を発生させる。
  });

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.chat-main__messages-box:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__messages').append(insertHTML);
        $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});


