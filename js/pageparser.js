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
            var url = $(this).attr('data-img');
            if (url) {
                $(this).after('<br><img src="' + url + '">');
                $(this).removeAttr('data-img');
            }
        };
        $('a', mdContainer).each(function () {
            var url = $(this).attr('href');
            $(this).attr('href', 'javascript:;');
            $(this).attr('data-img', url);
            $(this).click(fnTitleClicked);
        });

    })
}(jQuery));
