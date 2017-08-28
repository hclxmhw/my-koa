var loading,pageSize = 10,totalPage;
var page = 1;
$(function(){
	var id = localStorage.getItem("id");
	
	queryList(id,page);
	
	$("body").on("click",".jobList",function(e){
		var id = e.currentTarget.id;
		localStorage.setItem("jobId",id);
		localStorage.setItem("iPublish",1);
		location.href = "jobInfo.html";
	});
	
	$("#add").on("click",function(){
		location.href = "publish.html";
	});
	
	$(".mui-action-back").on("click",function(){
		history.back();
	});
	
	$('.count-wrapper').dropload({
		scrollArea: $(".count-wrapper"),
		autoLoad: true,
		loadUpFn: function(me) {
			queryList(id,page);
			me.resetload();
		},
		loadDownFn: function(me) {
			if(page < totalPage) {
				queryList(id,++page);
			} else {
				me.noData();
			}
			me.resetload();
		}
	});
	
})

function queryList(id,page){
	loading = weui.loading('加载中');
	$.ajax({
		url:"msg/select",
		type:"post",
		dataType:"json",
		data:{
			id:id,
			page:page,
			pageSize:pageSize
		},
		success:function(data){
			loading.hide();
			if(data.code==200){
				totalPage = data.total;
				for (var i = 0; i < data.data.length; i++) {
					var a = '<a class="weui-cell weui-cell_access jobList" id="'+data.data[i].id+'" href="javascript:;">'+
				                '<div class="weui-cell__bd" style="text-align: center;">'+
				                    '<p>'+data.data[i].work_type+'</p>'+
				                '</div>'+
				                '<div class="weui-cell__bd" style="text-align: center;">'+
				                    '<p>'+data.data[i].address+'</p>'+
				                '</div>'+
				                '<div class="weui-cell__bd" style="text-align: center;">'+
				                    '<p>'+dateFormatYMD(data.data[i].create_time)+'</p>'+
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
