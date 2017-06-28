var loading;
$(function(){
	var timestamp = new Date().getTime();
	getYzm(timestamp);
	
	$(".mui-action-back").on("click",function(){
		location.href = "login.html";
	})
	
	$("#loginPwd2").on("blur",function(){
		var loginPwd = $("#loginPwd").val();
		if(this.value!=""&&loginPwd!=""&&this.value!=loginPwd){
			weui.topTips("两次密码不一样！");
		}
	})
	
	$("#ext_dxyzm").on("blur",function(){
		var ext_dxyzm = $("#ext_dxyzm").val();
		if(ext_dxyzm!=""&&this.value!=$("#picYzm")[0].dataset.yzm){
			weui.topTips("验证码错误！");
		}
	})
	
	$("#picYzm").on("click",function(){
		var timestamp = new Date().getTime();
		getYzm(timestamp);
	})
	
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
	
	$("#register").on("click",function(){
		var mobile = $("#mobile").val();
		var ext_dxyzm = $("#ext_dxyzm").val();
		var ext_tpyzm = $("#ext_tpyzm").val();
		var loginPwd = $("#loginPwd").val();
		var loginPwd2 = $("#loginPwd2").val();
		var userType = 1;
		$("[name=checkbox1]").each(function(){
			if(this.checked == true){
				userType = this.id;
			}
		})
		if(mobile == ""){
			weui.topTips("请填写手机号！");
			return;
		}
		if(ext_dxyzm == ""){
			weui.topTips("请填写短信验证码！");
			return;
		}
		if(ext_tpyzm == ""){
			weui.topTips("请填写验证码！");
			return;
		}
		if(loginPwd == ""){
			weui.topTips("请填写密码！");
			return;
		}
		if(loginPwd2 == ""){
			weui.topTips("请填写密码！");
			return;
		}
		if(ext_dxyzm!=$("#picYzm")[0].dataset.yzm){
			weui.topTips("验证码错误！");
			return;
		}
		
		if(loginPwd2 != loginPwd){
			weui.topTips("两次密码不一样！");
			return;
		}
		loading = weui.loading('加载中');
		$.ajax({
			url:"user/register.do",
			type:"post",
			dataType:"json",
			data:{
				mobile:mobile,
				ext_dxyzm:ext_dxyzm,
				ext_tpyzm:ext_tpyzm,
				loginPwd:loginPwd,
				userType:userType
			},
			success:function(data, textStatus, jqXHR){
				loading.hide();
				if(data.code == 200){
					weui.toast(data.message);
					location.href = "login.html";
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
})

function getYzm(timestamp){
	$.ajax({
		url:"user/yzm.do?timestamp"+timestamp,
		success:function(data, textStatus, jqXHR){
			$("#picYzm")[0].dataset.yzm = data.ext_tpyzm;
			$("#picYzm")[0].src = "data:image/jpeg;charset=utf-8;base64,"+data.data;
		}
	})
}
