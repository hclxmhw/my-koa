var loading;
$(function(){
	var id = localStorage.getItem("jobId");
	var info = localStorage.getItem(id);
	var iPublish = localStorage.getItem("iPublish");
	if(iPublish!=null){
		$("#submit").hide();
	}
	info = JSON.parse(info);
	
	$("#createTime").text(dateFormat(info.create_time));
	$("#realName").text(info.real_name);
	$("#workType").text(info.work_type);
	$("#address").text(info.address);
	$("#price").text(info.price);
	$("#contact").text(info.contact);
	$("#workTime").text(dateFormat(info.work_time));
	$("#remark").text(info.remark == null ? "无" : info.remark);
	
	
	$(".mui-action-back").on("click",function(){
		localStorage.removeItem("iPublish");
		history.back();
	})
	
	$("#submit").on("click",function(){
		var postUserId = localStorage.getItem("id");
		var postUserName = localStorage.getItem("realName");
		loading = weui.loading('加载中');
		$.ajax({
			url:"mbi/add",
			type:"post",
			dataType:"json",
			data:{
				msgId:id,
				postUserId:postUserId,
				postUserName:postUserName,
				publicUserId:info.id,
				publicUserName:info.realName,
				workType:info.workType
			},
			success:function(data){
				loading.hide();
				if(data.code==200){
		            weui.toast("投递成功！",{
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
		});
	})
})