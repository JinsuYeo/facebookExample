



window.addEventListener('DOMContentLoaded',function(){
    const bell = document.querySelector('.bell');
    const leftBox = document.querySelector('.left_box');
    const rightBox = document.querySelector('.right_box')
    const feed = document.querySelector('#contents_container')
    const txt = document.querySelector('#comment37')


    leftBox.style.right = `${innerWidth * .5 + 430}px`
    rightBox.style.left = `${innerWidth * .5 + 90}px`

    function resizeFunc() {
        leftBox.style.right = `${innerWidth * .5 + 430}px`
        rightBox.style.left = `${innerWidth * .5 + 90}px`
    }

    function notification() {
        this.classList.toggle('on')
    }

    function addMorePostAjax(data){
        feed.insertAdjacentHTML('beforeend', data)
    }

    function callMorePostAjax(pageValue) {

        $.ajax({
            type: 'POST',
            url: 'data/post.html',
            data: pageValue,
            dataType: 'html',
            success: addMorePostAjax,
            error: ()=>{
                alert('문제가 발생했습니다!')
            }
        })
    }
 
    function scrollFunc() {
        let documentHeight = document.body.scrollHeight;
        let scrollHeight = pageYOffset + window.innerHeight;

        if(scrollHeight >= documentHeight-1){
            
            let pager = document.querySelector('#page');
            let pageValue = document.querySelector('#page').value;

            pager.value = parseInt(pageValue) + 1;

                if(pageValue > 5) {
                   pager.value = pageValue
                } else {
                    callMorePostAjax(pageValue);
                }
        }
    }

    function deligation(e) {
        let elem = e.target;
        
        console.log(elem);

        while (!elem.getAttribute('data-name')){
            elem = elem.parentNode;

            if(elem.nodeName === 'BODY'){
                elem = null;
                return
            }

        }

        if (elem.matches('[data-name="like"]')){
            console.log('좋아요!')
            elem.classList.toggle('active')

            let pk = elem.getAttribute('data-name');
            $.ajax({
                type:'POST',
                url:'./data/like.json',
                data:{pk},
                dataType:'json',
                success: (response)=>{
                    let likeCount = document.querySelector('#like-count-37')
                    
                    likeCount.innerHTML = response.like_count
                },
                error: ()=>{
                    alert('로그인이 필요합니다.');
                    window.location.replace('https://www.naver.com')
                }
            })
        } else if (elem.matches('[data-name="more"]')){
            console.log('more')
            elem.classList.toggle('active')
        } else if (elem.matches('[data-name="send"]')){
            
            $.ajax({
                type: 'POST',
                url: 'data/comment.html',
                data: '',
                dataType: 'html',
                success: (data)=>{
                    document.querySelector('.comment_container').insertAdjacentHTML('beforeend', data)
                },
                error: ()=>{
                    alert('로그인이 필요합니다.');
                    window.location.replace('https://www.naver.com')
                }
            })

            txt.value = '';

        } else if (elem.matches('[data-name="delete"]')){
            if(confirm('정말 삭제하시겠습니까?') === true){

                $.ajax({
                    type: 'POST',
                    url: './data/delete.json',
                    data: '',
                    dataType: 'json',
                    success: (response)=>{
                        if(response.status){
                            let comt = document.querySelector('.comment-37')
                            comt.remove();
                        }
                    },
                    error: ()=>{
                        alert('로그인이 필요합니다.')
                    }
                })

            };
        }
    }

    bell.addEventListener('click', notification)
    feed.addEventListener('click' , deligation)

    window.addEventListener('scroll', scrollFunc)
    window.addEventListener('resize', resizeFunc)

})
