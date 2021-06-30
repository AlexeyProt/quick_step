// Подключение текстового редактора tinymce
var tinymceScript = new TemplateScript('/js/modules/admin/tinymce/js/tinymce/tinymce.min.js');
tinymceScript.addScript('/js/modules/Uploader.js');
tinymceScript.callFunc(function () {
	tinymce.init({
		selector:'textarea[name="content"]',
		plugins: [ "link", 'image', 'table' ],
		language: "ru",
		setup: function (editor) {
			// Отключается уведомление "Домен не зарегистрирован" (для редактора подключаемого с облака)
/* 			var observer = new MutationObserver(function () {
				var notifications = editor.notificationManager.getNotifications();
				for ( var i = 0; i < notifications.length; i++ ) {
					if ( ~notifications[i].args.text.indexOf('This domain is not registered') ) {
						var click = new Event( 'click', { bubbles: true } );
						notifications[i].$el[0].querySelector('.mce-close').dispatchEvent(click);
						observer.disconnect();
					}
				}				
			});
			observer.observe(document.body, { childList: true });	 */		
		},
		file_picker_callback: function(callback, value, meta) {
			
			// Provide file and text for the link dialog
			if (meta.filetype == 'file') {
			callback('mypage.html', {text: 'My text'});
			}

			// Provide image and alt text for the image dialog
			if (meta.filetype == 'image') {
				var uploader = new Uploader();
				uploader.setHandler(function () {		
					var formData = new FormData();
					formData.append('userfile', uploader.getFiles()[0]);
					$.ajax({
						url: "/admin/uploader",
						type: "POST",
						data: formData,
						processData: false,
						contentType: false,
						success: function(data) {
							var json = JSON.parse(data);
							callback(json.location);
						},
						error: function(jqxhr, status, errorMsg) {
							switch( errorMsg ) {
								case 'Invalid extension':
									tinymce.activeEditor.windowManager.alert('Недопустимое расширение.');
									break;
								case 'Server Error':
									tinymce.activeEditor.windowManager.alert('Ошибка сервера.');
									break;
								default:
									tinymce.activeEditor.windowManager.alert('Произошла ошибка.');
									break;
							}
						}
					});						
				});
			}

			// Provide alternative source and posted for the media dialog
			if (meta.filetype == 'media') {
			callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
			}
		},
  // without images_upload_url set, Upload tab won't show up
  images_upload_url: '/admin/uploader',
  
  // we override default upload handler to simulate successful upload
  images_upload_handler: function (blobInfo, success, failure) {
		var formData = new FormData();
		formData.append('userfile', blobInfo.blob(), blobInfo.filename());
		$.ajax({
			url: "/admin/uploader",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				var json = JSON.parse(data);
				success(json.location);
			},
			error: function(jqxhr, status, errorMsg) {
				switch( errorMsg ) {
					case 'Invalid extension':
						failure('Недопустимое расширение.');
						break;
					case 'Server Error':
						failure('Ошибка сервера.');
						break;
					default:
						failure('Произошла ошибка.');
						break;
				}
			}
		});		  
  }
  	
	});
});