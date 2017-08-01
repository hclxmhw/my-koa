var loading,pageSize = 10,totalPage;
var page = 1;
$(function(){
	localStorage.removeItem("iPublish");
	var realName = localStorage.getItem("realName");
	$("#realName").text(realName);
	var userType = localStorage.getItem("userType");
	queryList(page);
	
	$("body").on("click",".jobList",function(e){
		var id = e.currentTarget.id;
		localStorage.setItem("jobId",id);
		location.href = "jobInfo.html";
	});
	
	
	$("#myInfo").on("click",function(){
		localStorage.setItem("id", localStorage.getItem("myId"));
		location.href = "myInfo.html";
	});
	
	$("#myResume").on("click",function(){
		location.href = "myResume.html";
	});
	
	$("#publishHis").on("click",function(){
		location.href = "publishHis.html";
	});
	
	$("#srRecord").on("click",function(){
		location.href = "srRecord.html";
	});
	
	$("#resumeSearch").on("click",function(){
		location.href = "resumeSearch.html";
	});
	
	$("#jobSearch").on("click",function(){
		location.href = "jobSearch.html";
	});
	$('.count-wrapper').dropload({
		scrollArea: $(".count-wrapper"),
		autoLoad: true,
		loadUpFn: function(me) {
			queryList(page);
			me.resetload();
		},
		loadDownFn: function(me) {
			if(page < totalPage) {
				queryList(++page);
			} else {
				me.noData();
			}
			me.resetload();
		}
	});
	
})

function queryList(page){
	loading = weui.loading('加载中');
	$.ajax({
		url:"msg/select",
		type:"post",
		dataType:"json",
		data:{
			page:page,
			pageSize:pageSize
		},
		success:function(data){
			loading.hide();
			if(data.code==200){
				totalPage = data.total;
				$(".listview").children("a").remove();
				for (var i = 0; i < data.data.length; i++) {
					var a = '<a class="weui-cell weui-cell_access jobList" href="javascript:;" id="'+data.data[i].id+'">'+
								'<div class="weui-cell__bd" style="text-align: center;">'+
									'<p>'+data.data[i].work_type+''+data.data[i].msg_type+'</p>'+
								'</div>'+
							'</a>'
					$(".listview").append(a);
					localStorage.setItem(data.data[i].id,JSON.stringify(data.data[i]));
				}
	            
			}else{
				weui.alert(data.message);
			}
		},
		error:function(){
			loading.hide();
			weui.alert("网络异常！");
		}
	})
}
