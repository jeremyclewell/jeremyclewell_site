let links = '<div class="BufferLine"><span class="Style_subheader">Email:</span><span class="Style_normal"> jeremy.clewell@gmail.com</span></div>';
links += '<div class="BufferLine"><span class="Style_subheader">Resume:</span><span class="Style_normal"> <a href="https://www.jeremyclewell.com/resume">https://www.jeremyclewell.com/resume</a></span></div>';
links += '<div class="BufferLine"><span class="Style_subheader">Projects:</span><span class="Style_normal"> <a href="http://www.jeremyclewell.com/blog/tag/past-work/10/?offset=0">https://www.jeremyclewell.com/projects</a></span></div>';

function insert_links() {
  if (!$('div.BufferLine:eq(6)').length) {
    window.requestAnimationFrame(insert_links);
  } else {
     $('div.BufferLine:eq(6)').append(links);
   }
};

insert_links();
