// shoplist物件設定
var shoplist = {};

shoplist.name = "MyBuylist 購物清單";
shoplist.time = "2018/10/16";
shoplist.list = [
  { name: "吹風機", price: 300 },
  { name: "麥克風", price: 3000 },
  { name: "筆記型電腦", price: 36000 },
  { name: "iphoneX", price: 60000 },
  { name: "海綿寶寶", price: 60 }
];

// 建立html模板
var item_html =
  '<li id={{id}} class="buy_item">{{num}}.{{item}}<div class="price">{{price}}</div><div id={{del_id}} data-delid={{del_item_id}} class="del_btn">X</div></li>';

var total_html =
  '<li class="buy_item total">總價<div class="price">{{price}}</div></li>';

// 刷新、刪除、新增list的item和total的金額,以及觸發刪除函式
function showlist() {
  $('#items_list').html('');
  var total_price = 0;
  for (var i = 0; i < shoplist.list.length; i++) {
    var item = shoplist.list[i];
    var item_id = "buyitem_" + i;
    var del_item_id = "del_buyitem_" + i;
    total_price += parseInt(item.price);
    var current_item_html = item_html
      .replace("{{num}}", i + 1)
      .replace("{{item}}", item.name)
      .replace("{{id}}", item_id)
      .replace('{{del_id}}', del_item_id)
      .replace("{{del_item_id}}",i)
      .replace("{{price}}", item.price);
    $("#items_list").append(current_item_html);
    //delbtn id buyitem_1
    $('#'+del_item_id).click(function() {
      remove_item(parseInt($(this).attr("data-delid")));
    })
  }
  var current_total_html = total_html.replace('{{price}}',total_price);
  $('#items_list').append(current_total_html);
}

showlist();

// 觸發新增購物資料清單
$(".addbtn").click(function() {
  shoplist.list.push({
    name: $("#input_name").val(),
    price: $("#input_price").val()
    });
  $("#input_name").val('');
  $("#input_price").val('');
  showlist();
  }
);

// 刪除的函式
function remove_item(id) {
  shoplist.list.splice(id,1);
  showlist();
}