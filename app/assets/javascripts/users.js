$(function(){
  function addUser(user){
    // Classの設定をHTMLに複数設定する場合、半角スペースでつなげることもある。必ずしもCSSが定義されているとも限らない。
    let html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.user_name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.user_name}">追加</div>
    </div>
    `;
    console.log(html);
    $("#user-search-result").append(html);
  }

  function addNoUser(){
    let html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">ユーザーが見つかりません</p>
    </div>
    `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  // 登録ボタンを押下した際にDBへ保存するために必要。
  function addMember(userId) {
    console.log("OK")
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }



  $('#user-search-field').on("keyup", function(){
    // letはvalとほぼ同じ意味。varは再宣言可、letは再宣言不可。varは関数スコープ、letはブロックスコープ。。
    let input = $("#user-search-field").val();
    $.ajax({
      url: "/users", //users_controllerの、indexアクションにリクエストの送信先を設定する
      type: "GET", //HTTPメソッド
      data: { keyword: input }, //テキストフィールドに入力された文字を設定する
      dataType: "json",
    })
    .done(function(users) {
      $("#user-search-result").empty();

      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
  
    // constは定数
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
    
  });

  $(document).on("click", ".chat-group-user__btn--remove", function() {
    console.log(this)
    $(this)
      .parent()
      .remove();
  });
});


