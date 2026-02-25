$(document).ready(function() {
  // Get the current URL and pathname
  var url = window.location.href;
  var pathname = window.location.pathname;

  // Split pathname into segments and filter out empty strings
  var segments = pathname.split('/').filter(function(segment) {
    return segment !== '';
  });

  // Get the first parameter (index 0)
  var firstParam = segments[0];

  console.log('URL:', url);
  console.log('Path segments:', segments);
  console.log('First parameter:', firstParam);

  // Define HTML content for each region
  var var_north = `
    <div id="radio-live-listen-block"><div id="now-playing-widget"><div class="artwork"><a href="https://listen.streamon.fm/cfwd" target="_blank"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/cfwd.png"></a></div><div class="info"><div class="animate-bars animate-bars-center radio-CFWD radio-bars"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></div>
  `;

  var var_eastcentral = `
    <div id="radio-live-listen-block"><div id="now-playing-widget"><div class="artwork"><a href="https://listen.streamon.fm/cjgx" target="_blank"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/cjgx.png"></a></div><div class="info"><div class="animate-bars animate-bars-center radio-bars radio-CJGX"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></div><div id="radio-live-listen-block"><div id="now-playing-widget"><div class="artwork"><a href="https://listen.streamon.fm/cfgw" target="_blank"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/cfgw.png"></a></div><div class="info"><div class="animate-bars animate-bars-center radio-bars radio-CFGW"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></div>
  `;

  var var_southwest = `
    <div id="radio-live-listen-block"><div id="now-playing-widget"><div class="artwork"><a href="https://listen.streamon.fm/ckrm" target="_blank"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/logo-ckrm-w-128.png"></a></div><div class="info"><div class="animate-bars animate-bars-center radio-bars radio-CKRM"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></div><div id="radio-live-listen-block"><div id="now-playing-widget"><div class="artwork"><a href="https://listen.streamon.fm/cfwf" target="_blank"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/cfwf.png"></a></div><div class="info"><div class="animate-bars animate-bars-center radio-bars radio-CFWF"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></div><div id="radio-live-listen-block"><div id="now-playing-widget"><div class="artwork"><a href="https://listen.streamon.fm/chmx" target="_blank"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/chmx.png"></a></div><div class="info"><div class="animate-bars animate-bars-center radio-bars radio-CHMX"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></div>
  `;

  var var_southeast = `
    <div id="radio-live-listen-block"><div id="now-playing-widget"><div class="artwork"><a href="https://listen.streamon.fm/ckrm" target="_blank"><img alt="Album Art" id="np-art" src="https://vmdev-media.azurewebsites.net/f/files/sasktoday/images/logo-ckrm-w-128.png"></a></div><div class="info"><div class="animate-bars animate-bars-center radio-CKRM radio-bars"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></div>
  `;

  // Determine which HTML to insert based on the first parameter
  var htmlToInsert = '';
  switch (firstParam) {
    case 'north':
      htmlToInsert = var_north;
      break;
    case 'central':
      htmlToInsert = var_eastcentral;
      break;
    case 'southwest':
      htmlToInsert = var_southwest;
      break;
    case 'southeast':
      htmlToInsert = var_southeast;
      break;
    default:
      console.log('No matching region found for:', firstParam);
      return;
  }

var heading = '<h2 class="title mt-0 mb-1">Tune In for Great Music!</h2>';
htmlToInsert = heading + htmlToInsert;

  // ⏳ Use setInterval to wait for .widget-poll to appear
  var checkExist = setInterval(function() {
    var $pollDiv = $('.widget.widget-poll');
    if ($pollDiv.length > 0) {
      $pollDiv.before(htmlToInsert);
      console.log('Custom HTML inserted before .widget-poll div for region:', firstParam);
      clearInterval(checkExist); // stop checking once inserted
    } else {
      console.log('Waiting for .widget-poll to appear...');
    }
  }, 300); // check every 300ms until found
});
