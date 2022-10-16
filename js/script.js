$(function() {
    SetKeyWords("data/keywords.js");

    // チェックボックス(Toggle) 値変更
    $('body').on('change', 'input[type="checkbox"]', function() { 
        $('#prompt').val(GetPrompt());
    });

    // copy button
    $('#copy-button').on('click',function(){
        navigator.clipboard.writeText($('#prompt').val());
    });
});

function SetKeyWords(url) {
    let $script = $('<script>').attr({
        'type': 'text/javascript',
        'src': url
    });
    $('body')[0].appendChild($script[0]);

    window.keyWords = new Map();
    $('#keywordCategories').empty();

    window.feed_callback = function(results) {
        results.categories.forEach(function (category) {        
            let div = $('<div>').attr({
                'class': 'col-md-1 col-sm-2 keyword_column'
            });
            div.append('<h5>' + category.name + '</h5>');

            $('#keywordCategories').append(div);

            category.items.forEach(function (item) {
                window.keyWords.set(item.id, item.prompt);
                let toggleDiv = $('<div>');
                let label = $('<label>').attr({
                    'for': item.id
                });
                label.html(item.caption);
                let toggle = $('<input>').attr({
                    'type': 'checkbox',
                    'id': item.id,
                    'class': 'form-check-input',
                });
                toggleDiv.append(label);
                toggleDiv.append(toggle);
                div.append(toggleDiv);
            });
        });
    }
}

function GetPrompt() {
    let prompt = "";
    $('input[type="checkbox"]:checked').each(function(index, element) {
        prompt += window.keyWords.get(element.id) + ", ";
    });
    return prompt;
}