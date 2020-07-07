Carousel

    state
        activeIndex

    property
        loop
        time
        imgList
        color
        forward
        autoPlay

    attribute
        startIndex
        loop
        time
        imgList
        color
        forward
        autoPlay

    children
        append remove add
    event
        change
        click
        dbclick
        hover
        swipe
        resize
    method
        next()
        prev()
        goTo()
        play()
        stop()
    config
       mode: "useRAF",
             "userTimeout"
CarouselView