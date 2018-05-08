// 

    var app = new ZiggeoApi.V2.Application({
        token: "4919f23cbee42b4be71fdc75207c9e30",
        webrtc_streaming: true,
        google_analytics: true
    });
    
    ZiggeoApi.V2.Config.set("flash", "YOUR-DOMAIN.TLD/SOME-PATH/recorder.swf");



// ZiggeoApi.Events.on("system_ready", function () {
//         var player = new ZiggeoApi.V2.Player({
//             element: document.getElementById("replace_me-v2_player"),
//             attrs: {
//                 width: 320,
//                 height: 180,
//                 theme: "modern",
//                 themecolor: "red",
//                 video: "_sample_video"
//             }
//         });

//         player.activate();
//     }); 
    $(window).on('load', function () {
        ZiggeoApi.Events.on("system_ready", function () {
            var recorder = new ZiggeoApi.V2.Recorder({
                element: document.getElementById("replace_me-v2_recorder"),
                attrs: {
                    width: 320,
                    height: 240,
                    theme: "modern",
                    themecolor: "red"
                }
            });

            recorder.activate();
        });
    })
// });