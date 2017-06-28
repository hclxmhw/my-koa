var loading;
$(function(){
	var myId = localStorage.getItem("myId");
	var realName = localStorage.getItem("realName");
	if(myId!=null&&realName!=null){
		location.href = "home.html";
	}
	$("#reg").on("click",function(){
		location.href = "reg.html";
	})
	
	$("#forgetPassword").on("click",function(){
		location.href = "forgetPwd.html";
	})
	
	$("#login").on("click",function(){
		var mobile = $("#mobile").val();
		var loginPwd = $("#loginPwd").val();
		if(mobile==""){
			weui.topTips("请填写手机号！");
			return;
		}
		if(mobile==""){
			weui.topTips("请填写密码！");
			return;
		}
		loading = weui.loading('加载中');
		$.ajax({
			type:"post",
			url:"login",
			dataType:"json",
			data:{
				mobile:mobile,
				loginPwd:loginPwd
			},
			success:function(data){
				loading.hide();
				if(data.code==200){
					localStorage.setItem("realName",data.data[0].real_name);
					localStorage.setItem("id",data.data[0].id);
					localStorage.setItem("myId",data.data[0].id);
					localStorage.setItem("userType",data.data[0].user_type);
					location.href = "home.html";
				}else{
					weui.alert(data.message);
				}
			},
			error:function(data){
				loading.hide();
				weui.alert("网络异常！");
			}
		});
	})
})
