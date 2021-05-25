$('#Bold').click(() => {
    document.execCommand('Bold')
})
$('#Italics').click(() => {
    document.execCommand('Italic')
})
$('#Underline').click(() => {
    document.execCommand('Underline')
})
//___________________________________________________________________________________________

$('#FontColorButton').click(() => {
    $('#FontColor').click()


    document.getElementById('FontColor').addEventListener('input', () => {
        const fontcolor = document.getElementById('FontColor').value
        console.log('Font Color ' + fontcolor)
        document.execCommand('forecolor', false, fontcolor)
    })
})

$('#Highlight').click(() => {
    $('#HighlightColor').click()


    document.getElementById('HighlightColor').addEventListener('input', () => {
        const highightcolor = document.getElementById('HighlightColor').value
        console.log('Highlight Color ' + highightcolor)
        document.execCommand('backColor', false, highightcolor)

    })
})
//___________________________________________________________________________________________

let fontSize = 3;

$('#DecreaseFontSize').click(function () {
    if (fontSize > 1)
        fontSize--;
    document.execCommand("fontSize", false, fontSize);
});

$('#IncreaseFontSize').click(function () {
    if (fontSize < 7)
        fontSize++;
    document.execCommand("fontSize", false, fontSize);
});

//___________________________________________________________________________________________

$('#ULButton').click(() => {
    document.execCommand('insertunorderedlist')
})

$('#SquareUL').click(() => {
    document.execCommand('insertunorderedlist')
    $('ul:last-child').attr('type', 'square')
})

$('#CircleUL').click(() => {
    document.execCommand('insertunorderedlist')
    $('ul:last-child').attr('type', 'circle')
})

$('#TriangleUL').click(() => {
    document.execCommand('insertunorderedlist')
    $('ul:last-child').attr('style', 'list-style-image: url("/Custom Triangle UL.png");')

})

//___________________________________________________________________________________________

$('#OLButton').click(() => {
    document.execCommand('insertorderedlist')
})

$('#OLa').click(() => {
    document.execCommand('insertorderedlist')
    $('ol:last-child:not(#OLi)').attr('type', 'a')
})
$('#OLi').click(() => {
    document.execCommand('insertorderedlist')
    $('ol:last-child:not(#OLi)').attr('type', 'i')
})
$('#OLA').click(() => {
    document.execCommand('insertorderedlist')
    $('ol:last-child:not(#OLi)').attr('type', 'A')
})
$('#OLI').click(() => {
    document.execCommand('insertorderedlist')
    $('ol:last-child:not(#OLi)').attr('type', 'I')
})


//___________________________________________________________________________________________

$('#Hyperlink').click(() => {
    const href = document.getElementById('HyperlinkURL').value
    document.execCommand('createlink', false, href)
    $('a').attr('contenteditable', 'false')
    $('a').css('backgroundColor', 'lightblue')
    $('a').css('padding', '5px')
    $('a').css('borderRadius', '10px')
})




//___________________________________________________________________________________________

$('#AlignCenter').click(() => {
    document.execCommand('JustifyCenter')
})
$('#AlignLeft').click(() => {
    document.execCommand('JustifyLeft')
})
$('#AlignRight').click(() => {
    document.execCommand('JustifyRight')
})

//___________________________________________________________________________________________



$('#Heading').click(() => {
    document.execCommand('stylewithcss', false, 'true')
    document.execCommand('fontSize', false, '60px')
    document.execCommand('bold')
    document.execCommand('underline')

    let enterabandonbu = false

    $('#TextTypes').html(` <span id="Heading"><b><u style="font-size: 60px;">Heading</u></b> &#9660;</span>
    
                        <span id="texttypedropdown" hidden>
                            <span id="Sub-Heading">Sub-Heading</span>
    
                            <span id="Statement"><i>"Statement "</i></span>
                            <span id="Paragraph" style="margin-top: 10px;">Paragraph</span>
                        </span>`)

    $('#output').keydown(() => {

        if (event.key === 'Enter') {
            function abandonbu() {
                document.execCommand('bold')
                document.execCommand('underline')
                document.execCommand('fontSize', false, '3')
                document.execCommand('stylewithcss', false, 'false')
                enterabandonbu = true;

            }
            if (!enterabandonbu) abandonbu()
        }

    })

    $('#Paragraph').click(() => {
        function abandonbu() {
            document.execCommand('bold')
            document.execCommand('underline')
            document.execCommand('fontSize', false, '3')
            document.execCommand('stylewithcss', false, 'false')
            enterabandonbu = true;

        }
        if (!enterabandonbu) abandonbu()

    })

})


$('#Sub-Heading').click(() => {
    // document.execCommand('stylewithcss', false, 'true')
    document.execCommand('fontSize', false, '6.43')
    let enterabandonbu = false


    $('#output').keydown(() => {

        if (event.key === 'Enter') {
            function abandonbu() {
                document.execCommand('fontSize', false, '3')
                document.execCommand('stylewithcss', false, 'false')
                enterabandonbu = true;

            }
            if (!enterabandonbu) abandonbu()
        }

    })

    $('#Paragraph').click(() => {
        function abandonbu() {
            document.execCommand('fontSize', false, '3')
            document.execCommand('stylewithcss', false, 'false')
            enterabandonbu = true;

        }
        if (!enterabandonbu) abandonbu()

    })

})

$('#FontFamily').click(() => {
    document.querySelector('#FontFamily').addEventListener('input', () => {
        document.execCommand('fontname', false, document.getElementById('FontFamily').value)
    })
})

$('#ManualFontSize').click(() => {
    document.getElementById('DefaultFontSizes').addEventListener('input', () => {
        document.execCommand('stylewithcss', false, 'true')
        document.execCommand('fontsize', false, document.getElementById('DefaultFontSizes').value)
        console.log(document.getElementById('DefaultFontSizes').value)
    })
})



$('#Statement').click(() => {
    document.execCommand('Italic')
    document.execCommand('formatblock', false, 'q')


    $('#Paragraph').click(() => {
        document.execCommand('fontSize', false, '3')
        document.execCommand('bold', true, 'false')
    })

})


document.getElementById('LocalImage').addEventListener('input', () => {
    console.log(document.getElementById('LocalImage').value)
    $('#imagesubmit').click()
    const imagename = ('LocalImage' + "_" + Date.now() + '.png')

    localStorage.setItem('imagename', imagename)

})


document.getElementById('LocalVideo').addEventListener('input', () => {
    console.log(document.getElementById('LocalVideo').value)
    $('#videosubmit').click()
    const videoname = ('LocalVideo' + "_" + Date.now() + '.mp4')

    localStorage.setItem('videoname', videoname)

})

setInterval(() => {
    const titlehtml = $('#Title').val()
    const outputhtml = $('#output').html()

    const titlecontent = {
        Title: titlehtml,
        Content: outputhtml
    }
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(titlecontent),
    })

    console.log(titlecontent)

}, 100);


