// basic load of posts
function getPosts() {
    let displayList = [];

    fetch("{{.PicoBloggerApiUrl}}")
    .then(function(response){
        return response.json()
    })
    .then((data) => {
        console.log(data);
        var list = document.getElementById("myList");
        list.innerHTML = ""; // hack to clear list on post to avoid appending
        data.forEach((item) => {
            console.log(item);
            displayList.push(item.author + " " + item.content + " " + item.timestamp);
            let li = document.createElement("li");
            li.innerText = item.author + ": " + item.content + " - " + item.timestamp;
            list.appendChild(li);
        })
        //console.log(displayList)
    })
    .catch((err) => {
        console.log(`Error fetching: ${err}`)
    });
    };

    //console.log("calling getPosts");
    getPosts();
        

    function submission(callback) {
    // Creating a XHR object
    //console.log("testing");
    let payload = document.getElementById("postcontent").value;
    console.log(payload);
    if (payload.length === 0) {
        console.log("Empty payload - not posting");
        return;
    }
    //let payload = "12345";
    //console.log(payload);
    // create a JSON object
    const json = {
        author: 'alex',
        content: payload
    }
    var data = JSON.stringify(json);
    console.log(data);
    let xhr = new XMLHttpRequest();
    let url = "{{.PicoBloggerApiUrl}}";

    xhr.onload = () => {
    // print JSON response
    if (xhr.status >= 200 && xhr.status < 300) {
        // parse JSON
        const response = JSON.parse(xhr.responseText)
        console.log(response)
        callback();
    }
    }
    

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");

    // send data and reload
    xhr.send(data);

    // clear field value
    //frm = document.getElementsByName("frm1");
    //console.log("trying to clear text");
    //frm.innerText = "";
    inputField = document.getElementById("postcontent");
    inputField.value = "";
    };
    
    // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
    const evtSource = new EventSource("{{.SseServerUrl}}", { withCredentials: false } );

    // select the eventTarget element
    //let eventTarget = document.getElementById('eventTarget');

    evtSource.onmessage = (event) => {
    //const newElement = document.createElement("li");
    //const eventList = document.getElementById("list");

    //newElement.textContent = `message: ${event.data}`;
    //eventList.appendChild(newElement);
    console.log(event);
    // parse JSON
    const payload = JSON.parse(event.data);

    if (payload['update']) {
        document.getElementById('eventTarget').innerText = payload['update'];
    }

    }


    evtSource.onerror = (err) => {
    console.error("EventSource failed:", err);
    };