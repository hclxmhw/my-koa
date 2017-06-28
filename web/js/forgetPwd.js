var loading;
$(function(){
	
	$("#sjYzm").on("click",function(e){
		var mobile = $("#mobile").val();
		if(mobile==""){
			weui.topTips("请填写手机号！");
			return;
		}
		if($(this).hasClass("disable")==true){
			return;
		}
		loading = weui.loading('加载中');
		$.ajax({
			url:"user/sms.do",
			type:"post",
			dataType:"json",
			data:{
				mobile:mobile
			},
			success:function(data, textStatus, jqXHR){
				loading.hide();
				if(data.code == 200){
					weui.toast('验证码已发送！', 1000);
					$(e.currentTarget).addClass("disable");
//					localStorage.setItem("interval", 120);
					var i = 120;
					var interval = setInterval(function(){
//						i = localStorage.getItem("interval");
						i--;
//						localStorage.setItem("interval", i);
						$(e.currentTarget).text("重新获取("+i+")");
						if(i==0){
							clearInterval(interval);
							$(e.currentTarget).removeClass("disable");
							$(e.currentTarget).text("获取验证码");
						}
					}, 1000);
				}else{
					weui.alert(data.message);
				}
			},
			error:function(){
				loading.hide();
				weui.alert("网络异常！");
			}
		})
	})
	
	$(".mui-action-back").on("click",function(){
//		location.href = "home.html";
		history.back();
	});
	
	$("#submit").on("click",function(){
		var mobile = $("#mobile").val();
		var ext_dxyzm = $("#ext_dxyzm").val();
		var newPwd = $("#newPwd").val();
		var newPwd2 = $("#newPwd2").val();
		
		if(mobile == ""){
			weui.topTips("请填写手机号");
			return;
		}
		if(ext_dxyzm == ""){
			weui.topTips("请填写短信验证码");
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
		$.ajax({
			url:"user/findPwd.do",
			type:"post",
			dataType:"json",
			data:{
				mobile:mobile,
				loginPwd:newPwd,
				ext_dxyzm:ext_dxyzm
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