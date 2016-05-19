(function ($) {
    'use strict';
    var mdContainer = $('#mdContainer');
    if (!mdContainer.length) {
        return;
    }
    $.get(mdContainer.attr('data-md') + '.md', function (data) {
        var mdParser = new Remarkable();
        mdContainer.html(mdParser.render(data));

        //隐藏标题
        $('h3', mdContainer).each(function () {
            if (/解法$/.test($(this).text())) {
                $(this).hide();
                $(this).next().hide();
            }
        });

        //修改链接功能
        var fnTitleClicked = function (ele) {
            var url = $(this).attr('data-img'),
                $link = $(this);
            if (url && $link.is('[data-img]')) {
                $link.after('<br><img src="' + url + '" style="display:block;">');
                $link.removeAttr('data-img');
            } else if ($link.next().next().is(':visible')) {
                $link.next().hide().next().hide();
            } else {
                $link.next().show().next().show();
            }
        };
        $('a', mdContainer).each(function () {
            var url = $(this).attr('href');
            $(this).attr('href', 'javascript:;');
            $(this).attr('data-img', url);
            $(this).click(fnTitleClicked);
        });

    });

    var $ul = $('header ul'), topUl = parseInt($(document.body).css('padding-top')) >= 50 ? 112 : 62,
        currentUlFixStatus = false, shouldUlFixStatus = false;
    $(window).scroll(function () {
        shouldUlFixStatus = ($(document.body).scrollTop() > topUl );
        if (currentUlFixStatus !== shouldUlFixStatus) {
            currentUlFixStatus = shouldUlFixStatus;
            $ul.css({position: shouldUlFixStatus ? 'fixed' : 'relative'})
        }
    })

}(jQuery));
