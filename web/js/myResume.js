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
		url:"resume/select",
		type:"post",
		dataType:"json",
		data:{
			id:id
		},
		success:function(data){
			loading.hide();
			if(data.code==200){
				$("#realName").text(data.data[0].real_name);
				$("#expSalary").text(data.data[0].exp_salary);
				$("#remark").text(data.data[0].remark == null ? "" : data.data[0].remark);
				$("#workAddress").text(data.data[0].work_address);
				$("#workType").text(data.data[0].work_type);
				$("#workYear").text(data.data[0].work_year);
				var work_exp = data.data[0].work_exp.split(",");
				for(var i=0;i<work_exp.length;i++){
					var tmpl = '<div style="line-height: 1.1;padding: 11px 0;">'+work_exp[i]+'</div>';
					$("#workExp").append($(tmpl));
				}
				var certificate = data.data[0].certificate.split(",");
				for(var i=0;i<certificate.length;i++){
					var tmpl = '<div style="line-height: 1.1;padding: 11px 0;">'+certificate[i]+'</div>';
					$("#certificate").append($(tmpl));
				}
				localStorage.setItem(id+"resume",JSON.stringify(data.data[0]));
				
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