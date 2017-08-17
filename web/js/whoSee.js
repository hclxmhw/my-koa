var loading,pageSize = 10,totalPage;
var page = 1;
$(function(){
	var id = localStorage.getItem("id");
	var resume = localStorage.getItem(id+"resume");
	if(resume!=null){
		resume = JSON.parse(resume);
	}
	queryList(resume.id,page);
	
	$("body").on("click",".info",function(e){
		localStorage.setItem("id",e.currentTarget.id);
		location.href = "myInfo.html";
	})
	
	$(".mui-action-back").on("click",function(){
		history.back();
	});
	
	$('.count-wrapper').dropload({
		scrollArea: $(".count-wrapper"),
		autoLoad: true,
		loadUpFn: function(me) {
			if(page != 1) {
				queryList(resume.id,--page);
			} else {
				me.noData();
			}
			me.resetload();
		},
		loadDownFn: function(me) {
			if(page < totalPage) {
				queryList(resume.id,++page);
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
		url:"resume/scanHistoryList",
		type:"post",
		dataType:"json",
		data:{
			resumeUserId:id,
			page:page,
			pageSize:pageSize
		},
		success:function(data){
			loading.hide();
			if(data.code==200){
				if(data.rows.length>0){
					for (var i = 0; i < data.rows.length; i++) {
						var tmpl = ' <a class="weui-cell weui-cell_access info" id="'+data.rows[i].scanUserId+'" href="javascript:;">'+
						                '<div class="weui-cell__bd" style="text-align: center;">'+
						                	'<p>'+data.rows[i].workType+'</p>'+
						                '</div>'+
						                '<div class="weui-cell__bd" style="text-align: center;">'+
						                    '<p>'+data.rows[i].scanName+'</p>'+
						                '</div>'+
						                '<div class="weui-cell__bd" style="text-align: center;">'+
						                    '<p>'+dateFormatYMD(data.rows[i].scanTime)+'</p>'+
						                '</div>'+
						            '</a>'
		                $(".listview").append(tmpl);
					}
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