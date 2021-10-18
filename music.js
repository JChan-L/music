window.onload = function () {
	document.querySelector("input").focus();
};

const audio = new Audio();

/* function playSong(id) {
  fetch("http://hawav.cn:3000/song/url?br=320000&id=" + id)
	.then((res) => res.json())
	.then((def) => def.data[0].url)
	.then((url) => {
	  if (url) {
		audio.src = url;
		audio.play();
	  } else {
		alert("需要登录以后播放");
	  }
	});
} */

//没有远程播放、歌手
function playSong(id) {

	fetch("http://localhost:3000/song/url?br=320000&id=" + id)
		.then((res) => res.json())
		.then((def) => def.data[0].url)
		.then((url) => {
			if (url) {
				audio.src = url;
				audio.play();
			} else {
				alert("需要登录以后播放");
			}
		});
}

/* function search(kw) {
  const ol = document.getElementById("search_result");
  ol.innerHTML = "";
  fetch("http://hawav.cn:3000/search?keywords=" + kw)
	.then((res) => res.json())
	.then((res) => res.result.songs)
	.then((songs) => songs.map((s) => ({ id: s.id, name: s.name })))
	.then((songs) =>
	  songs.forEach((s) => {
		const li = document.createElement("li");
		li.innerText = `${s.name} - ${s.artists.map((a) => a.name).join("|")}`;
		li.style.cursor = "pointer";
		li.onclick = () => playSong(s.id);
		ol.appendChild(li);
	  })
	)
	.then((document.querySelector("input").value = ""));
} */


//没有远程播放、歌手
function search(kw) {
	// 清空之前的搜索结果
	const ol = document.getElementById("search_result");
	ol.innerHTML = "";

	fetch("http://localhost:3000/search?keywords=" + kw)
		.then((res) => res.json())
		.then((res) => res.result.songs)
		.then((songs) => songs.map((s) => ({ id: s.id, name: s.name })))
		.then((songs) =>
			songs.forEach((s) => {
				const li = document.createElement("li");
				li.innerText = s.name;
				li.onclick = () => playSong(s.id);
				ol.appendChild(li);
			})
		)
		.then((document.querySelector("input").value = ""));
}

function getMusic() {
	let inputValue = document.getElementById("srchSong").value;
	console.log(inputValue);
	search(inputValue)
}

window.onscroll = function () {
	if (
		document.body.scrollTop > 300 ||
		document.documentElement.scrollTop > 300
	) {
		document.getElementById("topBtn").style.display = "block";
	} else {
		document.getElementById("topBtn").style.display = "none";
	}
};

function goTop() {
	let speed = 1; //控制速度

	//开定时器
	let timer = setInterval(function () {
		//获取滚动条的高度
		let scrollTop =
			document.documentElement.scrollTop || document.body.scrollTop;
		//设置滚动的高度
		document.documentElement.scrollTop = document.body.scrollTop =
			scrollTop - speed;
		speed += 5;

		//清除定时器
		if (scrollTop <= 0) {
			clearInterval(timer);
			document.querySelector("#srchSong").focus();
		}
	}, 30);
}


function zangting() {
	audio.pause();
}


function songgame() {
	audio.addEventListener("timeupdate", function () {

		console.log(audio.currentTime)
		if (audio.currentTime >= 210) {
			audio.pause();
			audio.currentTime = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
		}
	});
	// 让视频观看到第10s
	audio.currentTime = Math.floor(Math.random() * (200 - 150 + 1)) + 150;

	//获取视频的总长度
	console.log(li.duration)
}
