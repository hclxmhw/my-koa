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
        		url:"score/add.do",
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
		url:"user/select.do",
		type:"post",
		dataType:"json",
		data:{
			id:id
		},
		success:function(data){
			loading.hide();
			if(data.code==200){
				app.realName = data.rows.realName;
				app.mobile = data.rows.mobile;
				app.age = data.rows.age;
				app.idCardNum = data.rows.idCardNum;
				app.idCardFront = urlurl+"/grp"+data.rows.idCardFront;
				app.idCardBack = urlurl+"/grp"+data.rows.idCardBack
				app.scores = new Array(parseInt(data.rows.score == null ? "0" : data.rows.score ));
//				$("#realName").text(data.rows.realName);
//				$("#mobile").text(data.rows.mobile);
//				$("#age").text(data.rows.age);
//				$("#idCardNum").text(data.rows.idCardNum);
//				$("#idCardFront").children("img")[0].src = "/grp"+data.rows.idCardFront;
//				$("#idCardBack").children("img")[0].src = "/grp"+data.rows.idCardBack
				localStorage.setItem(id+"info",JSON.stringify(data.rows));
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