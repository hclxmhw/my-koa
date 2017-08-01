var loading,app;
$(function(){
	app = new Vue({
		el:"#form",
		data:{
			realName:"",
			mobile:"",
			age:"",
			idCardNum:"",
			idCardFront:"",
			idCardBack:"",
			scores:[]
		}
	})
	var id = localStorage.getItem("id");
	var myId = localStorage.getItem("myId");
	if(id == myId){
		$(".link-area").show();
		$("#score").hide();
	}
	queryMyInfo(id);
	
	$.fn.raty.defaults.path = 'raty-2.5.2/lib/img';
	$('#star').raty({
        half    : false,
        starOff : 'star-off.png',
        starOn  : 'star-on.png',
        starHalf: 'star-half.png',
        score: function() {
            return $(this).attr('data-score');
        },
        click: function(score, evt) {
        	$.ajax({
        		url:"score/add",
        		type:"post",
        		dataType:"json",
        		data:{
        			userId:myId,
        			realName:app.realName,
        			score:score,
        			fromId:id
        		},
        		success:function(data){
        			if(data.code==200){
        				$('#star').attr('data-score',score);
        			}else{
        				weui.alert(data.message);
        				$('#star').attr('data-score',0);
        				$("[name=scrore]").val("0");
        				$('#star').raty('score', 0);
        			}
        		},
        		error:function(){
        			weui.alert("网络异常！");
        			$('#star').attr('data-score',0);
        		}
        	});
        }

    });
	
	$("#edit").on("click",function(){
		location.href = "myInfoEdit.html";
	})
	
	$("#editPwd").on("click",function(){
		location.href = "editPwd.html";
	})
	
	$(".mui-action-back").on("click",function(){
//		location.href = "home.html";
		history.back();
	});
	
	$("#idCardFront").on("click",function(e){
		var url = $(this).children("img")[0].src;
		var gallery = weui.gallery(url, {
		    onDelete: function(){
//		        if(confirm('确定删除该图片？')){ console.log('删除'); }
		        gallery.hide(function() {
		             console.log('`gallery` has been hidden');
		         });
		    }
		});
	});
	
	$("#idCardBack").on("click",function(e){
		var url = $(this).children("img")[0].src;
		var gallery = weui.gallery(url, {
		    onDelete: function(){
//		        if(confirm('确定删除该图片？')){ console.log('删除'); }
		        gallery.hide(function() {
		             console.log('`gallery` has been hidden');
		         });
		    }
		});
	});
})

function queryMyInfo(id){
	loading = weui.loading('加载中');
	$.ajax({
		url:"user/select",
		type:"post",
		dataType:"json",
		data:{
			id:id
		},
		success:function(data){
			loading.hide();
			if(data.code==200){
				app.realName = data.data[0].real_name;
				app.mobile = data.data[0].mobile;
				app.age = data.data[0].age;
				app.idCardNum = data.data[0].id_card_num;
				app.idCardFront = urlurl+"/grp"+data.data[0].id_card_front;
				app.idCardBack = urlurl+"/grp"+data.data[0].id_card_back
				app.scores = new Array(parseInt(data.data[0].score == null ? "0" : data.data[0].score ));
//				$("#realName").text(data.data[0].realName);
//				$("#mobile").text(data.data[0].mobile);
//				$("#age").text(data.data[0].age);
//				$("#idCardNum").text(data.data[0].idCardNum);
//				$("#idCardFront").children("img")[0].src = "/grp"+data.data[0].idCardFront;
//				$("#idCardBack").children("img")[0].src = "/grp"+data.data[0].idCardBack
				localStorage.setItem(id+"info",JSON.stringify(data.data[0]));
			}else{
				weui.alert(data.message);
			}
		},
		error:function(){
			loading.hide();
			weui.alert("网络异常！");
		}
	});
}