var loading;
$(function(){
	var id = localStorage.getItem("id");
	var myId = localStorage.getItem("myId");
	if(id == myId){
		$(".link-area").show();
	}
	queryMyResume(id);
	
	$(".mui-action-back").on("click",function(){
//		location.href = "home.html";
		history.back();
	});
	
	$("#whoSee").on("click",function(){
		location.href = "whoSee.html";
	});
	
	$("#edit").on("click",function(){
		location.href = "myResumeEdit.html";
	});
})

function queryMyResume(id){
	loading = weui.loading('加载中');
	$.ajax({
		url:"resume/select.do",
		type:"post",
		dataType:"json",
		data:{
			id:id
		},
		success:function(data){
			loading.hide();
			if(data.code==200){
				$("#realName").text(data.rows.realName);
				$("#expSalary").text(data.rows.expSalary);
				$("#remark").text(data.rows.remark == null ? "" : data.rows.remark);
				$("#workAddress").text(data.rows.workAddress);
				$("#workType").text(data.rows.workType);
				$("#workYear").text(data.rows.workYear);
				var workExp = data.rows.workExp.split(",");
				for(var i=0;i<workExp.length;i++){
					var tmpl = '<div style="line-height: 1.1;padding: 11px 0;">'+workExp[i]+'</div>';
					$("#workExp").append($(tmpl));
				}
				var certificate = data.rows.certificate.split(",");
				for(var i=0;i<certificate.length;i++){
					var tmpl = '<div style="line-height: 1.1;padding: 11px 0;">'+certificate[i]+'</div>';
					$("#certificate").append($(tmpl));
				}
				localStorage.setItem(id+"resume",JSON.stringify(data.rows));
				
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