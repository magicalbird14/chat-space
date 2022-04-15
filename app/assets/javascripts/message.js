$(function () {
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="chat-main__messages-box>
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
      `<div class="chat-main__messages-box">
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
});


