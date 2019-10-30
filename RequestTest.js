
const salam = {

    Request : function(pageNumber)
    {
        var requestURL = "https://picsum.photos/v2/list?page="+`${pageNumber}`+"&limit=40"
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);

        request.responseType = 'json';
        request.send();

        request.onload = function()
        {
            let ListOfPic = request.response;
            
            for(var i = 0 ; i < ListOfPic.length ; i++)
            {
                let address = request.response[i]['download_url'];
                let w = request.response[i]['width'];
                let h = request.response[i]['height'];

                let picc = document.createElement("img");
                let divid = document.createElement("div");

                let div2 = document.createElement("div");
                let a1 = document.createElement("a");
                let a2 = document.createElement("a");
                let a3 = document.createElement("button");
                // let a4 = document.createElement("a");
                let iconPic1 = document.createElement("i");
                let iconPic2 = document.createElement("i");
                let iconPic3 = document.createElement("i");
                // let iconPic4 = document.createElement("i");



                picc.src = address;
                divid.id = `negar${i}`;
                divid.className = "secondDiv";


                div2.className = "overlay";
                a1.className = "icon1";
                a2.className = "icon2";
                a3.className = "icon3";
                // a4.className = "icon4";
                // a4.id = `star${i}`;

                iconPic1.className = "fas fa-download";
                iconPic2.className = "fas fa-share-alt-square";
                iconPic3.className = "fab fa-gratipay";
                // iconPic4.className = "far fa-star";

                divid.appendChild(picc);
                document.querySelector("#Container").appendChild(divid);

                if((request.response[i]['height']/request.response[i]['width']) > 1.5)
                {
                
                    let selectt = document.querySelector(`#negar${i}`)
                    selectt.className="secondDiv siamak"
                }

                
                divid.appendChild(div2);
                div2.appendChild(a1);
                div2.appendChild(a2);
                div2.appendChild(a3);
                // div2.appendChild(a4);
                a1.appendChild(iconPic1);
                a2.appendChild(iconPic2);
                a3.appendChild(iconPic3);
                // a4.appendChild(iconPic4);

                a1.href = request.response[i]['download_url'];

                a2.onclick = function(url){
                    url = address;
                    var copyLink = document.createElement("input");
                    copyLink.setAttribute("value", url)
                    document.body.appendChild(copyLink);
                    copyLink.select();
                    document.execCommand("copy");
                    alert("Copy In Clipboard")
                }
                a3.onclick = function(){
                //    like(address)
                    if(localStorage.getItem(address) == 'LIKE')
                    {
                        this.style.backgroundColor = 'transparent'
                        // document.querySelector(`#star${i}`).style.display = "none"
                        localStorage.removeItem(address);
                    }
                    else
                    {
                        localStorage.setItem(address , 'LIKE')
                        // document.querySelector(`star${i}`).style.display = "block"
                        this.style.backgroundColor = 'red'
                    }
                }
                // if(localStorage.getItem(address) == 'LIKE')
                // {
                //     this.style.backgroundColor = 'red'
                // }
            }  
        }
        document.querySelector("#Container").innerHTML = '';
    },

    search : function()
    {
        document.querySelector(".search-txt").addEventListener('click' , function(e){
            console.log(e.target.value)
            console.log("You are crazy :))")
            // for(let p = 1 ; p < 7 ; p++)
            // {
                var requestURL = "https://picsum.photos/v2/list"
                var request = new XMLHttpRequest();
                request.open('GET', requestURL);

                request.responseType = 'json';
                request.send();
                        
                request.onload = function()
                {
                    document.querySelector("#Container").innerHTML = ''; 
                    let ListOfPic = request.response;
                    console.log(ListOfPic.length)
                    for(let i = 0 ; i < ListOfPic.length ; i++)
                    { 
                        if(ListOfPic[i].author.toUpperCase().includes(e.target.value.toUpperCase()))
                        {
                            console.log(ListOfPic[i].author)
                            let address = request.response[i]['download_url'];
                
                            let picc = document.createElement("img");
                            let divid = document.createElement("div");

                            picc.src = address;
                            divid.id = `negar${i}`;

                            divid.appendChild(picc);
                            document.querySelector("#Container").appendChild(divid);

                            if((request.response[i]['height']/request.response[i]['width']) > 1.5)
                            {
                            
                                let selectt = document.querySelector(`#negar${i}`)
                                selectt.className="secondDiv siamak"
                            }

                        }
                    }
                //}
            }
        })
        document.querySelector("#Container").innerHTML = '';
    }
}
function like(likedUrl)
{
    let bookmark = localStorage.getItem(likedUrl)
    console.log(bookmark);
    if(bookmark == 'LIKE')
    {
        bookmark.style.backgroundColor = 'transparent';
        localStorage.removeItem(likedUrl);
    }
    else
    {
        localStorage.setItem(likedUrl , 'LIKE');
        likedUrl.style.backgroundColor = 'red'
    }
}
