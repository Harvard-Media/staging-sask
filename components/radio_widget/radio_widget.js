$(document).ready(function () {
    // Get the current URL and pathname
    var url = window.location.href;
    var pathname = window.location.pathname;

    // Split pathname into segments and filter out empty strings
    var segments = pathname.split("/").filter(function (segment) {
        return segment !== "";
    });

    // Get the first parameter (index 0)
    var firstParam = segments[0];

    console.log("URL:", url);
    console.log("Path segments:", segments);
    console.log("First parameter:", firstParam);

    // Define HTML content for each region
    var var_north = `
      <div id="radio-live-listen-block"><a href="https://listen.streamon.fm/cfwd?utm_source=sasktoday&utm_medium=widget&utm_campaign=radio-live-listen&utm_content=tune-in-music-cfwd&utm_term=north-communities" target="_blank"><div id="now-playing-widget"><div class="artwork"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/cfwd.png"></div><div class="info"><div class="animate-bars animate-bars-center radio-CFWD radio-bars"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></a></div>
    `;

    var var_eastcentral = `
      <div id="radio-live-listen-block"><a href="https://listen.streamon.fm/cjgx?utm_source=sasktoday&utm_medium=widget&utm_campaign=radio-live-listen&utm_content=tune-in-music-cjgx&utm_term=eastcentral-communities" target="_blank"><div id="now-playing-widget"><div class="artwork"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/cjgx.png"></div><div class="info"><div class="animate-bars animate-bars-center radio-bars radio-CJGX"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></a></div><div id="radio-live-listen-block"><a href="https://listen.streamon.fm/cfgw?utm_source=sasktoday&utm_medium=widget&utm_campaign=radio-live-listen&utm_content=tune-in-music-cfgw&utm_term=eastcentral-communities" target="_blank"><div id="now-playing-widget"><div class="artwork"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/cfgw.png"></div><div class="info"><div class="animate-bars animate-bars-center radio-bars radio-CFGW"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></a></div>
    `;

    var var_southwest = `
      <div id="radio-live-listen-block"><a href="https://listen.streamon.fm/ckrm?utm_source=sasktoday&utm_medium=widget&utm_campaign=radio-live-listen&utm_content=tune-in-music-ckrm&utm_term=southwest-communities" target="_blank"><div id="now-playing-widget"><div class="artwork"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/logo-ckrm-w-128.png"></div><div class="info"><div class="animate-bars animate-bars-center radio-bars radio-CKRM"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></a></div><div id="radio-live-listen-block"><a href="https://listen.streamon.fm/cfwf?utm_source=sasktoday&utm_medium=widget&utm_campaign=radio-live-listen&utm_content=tune-in-music-cfwf&utm_term=southwest-communities" target="_blank"><div id="now-playing-widget"><div class="artwork"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/cfwf.png"></div><div class="info"><div class="animate-bars animate-bars-center radio-bars radio-CFWF"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></a></div><div id="radio-live-listen-block"><a href="https://listen.streamon.fm/chmx?utm_source=sasktoday&utm_medium=widget&utm_campaign=radio-live-listen&utm_content=tune-in-music-chmx&utm_term=southwest-communities" target="_blank"><div id="now-playing-widget"><div class="artwork"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/chmx.png"></div><div class="info"><div class="animate-bars animate-bars-center radio-bars radio-CHMX"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></a></div>
    `;

    var var_southeast = `
      <div id="radio-live-listen-block"><a href="https://listen.streamon.fm/ckrm?utm_source=sasktoday&utm_medium=widget&utm_campaign=radio-live-listen&utm_content=tune-in-music-ckrm&utm_term=southeast-communities" target="_blank"><div id="now-playing-widget"><div class="artwork"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/logo-ckrm-w-128.png"></div><div class="info"><div class="animate-bars animate-bars-center radio-CKRM radio-bars"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></a></div>
    `;

    // Determine which HTML to insert based on the first parameter
    var htmlToInsert = "";
    switch (firstParam) {
        case "north":
            htmlToInsert = var_north;
            break;
        case "saskatoon-today":
            htmlToInsert = var_north;
            break;
        case "central":
            htmlToInsert = var_eastcentral;
            break;
        case "southwest":
            htmlToInsert = var_southwest;
            break;
        case "southeast":
            htmlToInsert = var_southeast;
            break;
        case "regina-today":
            htmlToInsert = var_southwest;
            break;
        default:
            console.log("No matching region found for:", firstParam);
            return;
    }

    var heading = '<h2 class="title mb-1">Tune In for Great Music!</h2>';
    htmlToInsert = heading + htmlToInsert;

    // ⏳ Use setInterval to wait for .widget-poll to appear
    var checkExist = setInterval(function () {
        var $pollDiv = $(".widget.widget-poll");
        var $firstGAM = $(".widget-area-col.col-md-4 .widget.widget-dfp.gam").first();

        if ($pollDiv.length > 0) {
            $pollDiv.before(htmlToInsert);
            console.log("Custom HTML inserted before .widget-poll div for region:", firstParam);
            clearInterval(checkExist); // stop checking once inserted
        } else if ($firstGAM.length > 0) {
            console.log("Found the first widget widget");
            $firstGAM.after(htmlToInsert);
            clearInterval(checkExist); // stop checking once inserted
        } else {
            console.log("Widget not found.");
        }
    }, 300); // check every 300ms until found
});
