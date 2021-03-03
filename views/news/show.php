<div class="postContainer sm-3-4">
	<h1 class="postTitle">
		<?php echo $title; ?>
	</h1>
	<div class="postImage">
		<img src="<?php echo $image; ?>">
	</div>
	<div class="postDate">
		<?php echo substr_replace($date, "", -8); ?>
	</div>
	<div class="postContent">
		<?php echo $content; ?>
	</div>
</div>