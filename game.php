<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<title>Celebrity Crush</title>


		<style>
		  body {
		    padding: 0px;
		    margin: 0px;
		  }
		  </style>
	</head>

	<body>
		<script>
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '141307063062363',
		      xfbml      : true,
		      version    : 'v2.8'
		    });

		    // ADD ADDITIONAL FACEBOOK CODE HERE
		  };

		  (function(d, s, id){
		     var js, fjs = d.getElementsByTagName(s)[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement(s); js.id = id;
		     js.src = "//connect.facebook.net/en_US/sdk.js";
		     fjs.parentNode.insertBefore(js, fjs);
		   }(document, 'script', 'facebook-jssdk'));
		</script>
		<link rel="stylesheet" type="text/css" href="css/gamecss.css">
		<div id="dom-goodimages" style="display: none;">
			<?php
			//images
		    $dir = "Game Assets/GoodCelebrities/Images/";
			$it = new FilesystemIterator($dir);
			foreach ($it as $fileinfo) {
				echo $fileinfo->getFilename() . ",";
			}

	    	?>
		</div>
		<div id="dom-goodsounds" style="display: none;">
			<?php
			//sounds
		    $dir = "Game Assets/GoodCelebrities/Sounds/";
			$it = new FilesystemIterator($dir);
			foreach ($it as $fileinfo) {
				echo $fileinfo->getFilename() . ",";
			}

	    	?>
		</div>
		<div id="dom-badimages" style="display: none;">
			<?php
			//images
		    $dir = "Game Assets/BadCelebrities/Images/";
			$it = new FilesystemIterator($dir);
			foreach ($it as $fileinfo) {
				echo $fileinfo->getFilename() . ",";
			}

	    	?>
		</div>
		<div id="dom-badsounds" style="display: none;">
			<?php
			//sounds
		    $dir = "Game Assets/BadCelebrities/Sounds/";
			$it = new FilesystemIterator($dir);
			foreach ($it as $fileinfo) {
				echo $fileinfo->getFilename() . ",";
			}

	    	?>
		</div>

		<script type="text/javascript" src="jquery-3.1.1.min.js"></script>
		<script>
		    var div = document.getElementById("dom-goodimages");
		    var goodimages = div.textContent.replace(/\n/g,'');
		    goodimages = goodimages.replace('/ /g','');
		    goodimages = goodimages.replace(/\t/g,'');
		    goodimages = goodimages.split(",");
		    div = document.getElementById("dom-goodsounds");
		    var goodsounds = div.textContent.replace(/\n/g,'');
		    goodsounds = goodsounds.replace('/ /g','');
		    goodsounds = goodsounds.replace(/\t/g,'');
		    goodsounds = goodsounds.split(",");

		    div = document.getElementById("dom-badimages");
		    var badimages = div.textContent.replace(/\n/g,'');
		    badimages = badimages.replace('/ /g','');
		    badimages = badimages.replace(/\t/g,'');
		    badimages = badimages.split(",");
		    div = document.getElementById("dom-badsounds");
		    var badsounds = div.textContent.replace(/\n/g,'');
		    badsounds = badsounds.replace('/ /g','');
		    badsounds = badsounds.replace(/\t/g,'');
		    badsounds = badsounds.split(",");
		</script>
		<script type="text/javascript" src="phaser.min.js"></script>
		<script type="text/javascript" src="Game.js"></script>
		<script type="text/javascript" src="MainMenu.js"></script>
		<script type="text/javascript" src="Preload.js"></script>
		<script type="text/javascript" src="Boot.js"></script>
		<script type="text/javascript" src="Main.js"></script>
	</body>
</html>
