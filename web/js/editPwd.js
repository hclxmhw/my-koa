var loading;
$(function(){
	
	$("#newPwd2").on("blur",function(){
		var newPwd = $("#newPwd").val();
		if(this.value!=""&&newPwd!=""&&this.value!=newPwd){
			weui.topTips("两次密码不一样！");
		}
	})
	
	$(".mui-action-back").on("click",function(){
		history.back();
	})
	
	$("#submit").on("click",function(){
		var oldPwd = $("#oldPwd").val();
		var newPwd = $("#newPwd").val();
		var newPwd2 = $("#newPwd2").val();
		
		if(oldPwd == ""){
			weui.topTips("请输入旧密码");
			return;
		}
		if(newPwd == ""){
			weui.topTips("请输入新密码");
			return;
		}
		if(newPwd2 == ""){
			weui.topTips("请输入新密码");
			return;
		}
		if(newPwd2 != newPwd){
			weui.topTips("两次密码不一样！");
			return;
		}
		
		loading = weui.loading('加载中');
		var id = localStorage.getItem("id");
		$.ajax({
			url:"user/updatePwd.do",
			type:"post",
			dataType:"json",
			data:{
				id:id,
				loginPwd:oldPwd,
				newPwd:newPwd
			},
			success:function(data){
				loading.hide();
				if(data.code==200){
					weui.toast('保存成功！', {
					    duration: 2000,
					    callback: function(){ 
					    	history.back();
				    	}
					});
				}else{
					weui.alert(data.message);
				}
			},
			error:function(){
				loading.hide();
				weui.alert("网络异常！");
			}
		})
	});
})