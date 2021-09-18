    // Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const PlAYER_STORAGE_KEY = "F8_PLAYER";

    const player = $(".btn_plays");
    // const cd = $(".cd");
    const heading = $(".media_content-title span");
    const cdThumb = $(".media_left-circle");
    const audio = $("#audio");
    // console.log (heading, cdThumb, audio);
    
    const playBtn = $(".btn_play-pause");
    const progress = $("#progress_time");
    const prevBtn = $(".btn_back");
    const nextBtn = $(".btn_next");
    const randomBtn = $(".btn_mix");
    const btnIconMix = $(".fa-random");
    const btnIconPlay = $(".icon_play-pause");
    // const timeCurrent = $(".time_duration");
    // const timeDuration = $(".time_total");
    const repeatBtn = $(".btn_repeat");
    const btnIconRepeat = $(".fa-redo-alt");
    const playlist = $(".playlists");
    // alert ("123");
  
    const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "faded",
            singer: "TheFatRat",
            path: "./assets/css/video/fade.mp4",
            image: "./assets/css/img/edm3.jpg"
        },
        {
        name: "Alone",
        singer: "Sơn Tùng M-TP",
        path: "./assets/css/video/alone.mp4",
        image: "./assets/css/img/badliar.jpg"
        },

        {
        name: "at my worst",
        singer: "TheFatRat",
        path: "./assets/css/video/atmyworst.mp4",
        image: "./assets/css/img/atmyworst.jpg"
        },
        {
        name: "bad liar",
        singer: "Alan Walker",
        path: "./assets/css/video/badliar.mp4",
        image: "./assets/css/img/badliar.jpg"
        },
        {
        name: "far away",
        singer: "Alan Walker",
        path: "./assets/css/video/faraway.mp4",
        image: "./assets/css/img/edm2.jpg"
        },
        {
        name: "some gril like you",
        singer: "Alan Walker",
        path: "./assets/css/video/grillikeyou.mp4",
        image: "./assets/css/img/somegrillikeyou.jpg"
        },
        {
        name: "Lost Control",
        singer: "Deamn",
        path: "./assets/css/video/lostcontroll.mp3",
        image: "./assets/css/img/LostControl.jpg"
        },
        {
        name: "skyline",
        singer: "K-391",
        path: "./assets/css/video/skyline.mp4",
        image: "./assets/css/img/edm1.jpg"
        },
        {
        name: "the night",
        singer: "Lisa",
        path: "./assets/css/video/thenight.mp4",
        image: "./assets/css/img/TheNights.jpg"
        },
        
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function () {
      
        const htmls = this.songs.map(song => {
          return ` 
          <div class="song">
                                        <div class="song_name">
                                            <div class="song_name_img" style="background-image: url(${song.image}) ">
                                            </div>
                                            <div class="song_name_title">
                                                <div class="song_name_title-name">
                                                    ${song.name}
                                                </div>
                                                <div class="song_name_title-subname">
                                                    ${song.singer}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="song_infor">
                                            <span>3:15</span>
                                            <div class="song_infor-tool">
                                                <i class="fas fa-microphone-alt icon"></i>
                                                <i class="far fa-heart icon"></i>
                                                <i class="fas fa-caret-down icon"></i>
    
                                            </div>
    
                                        </div>
                                    </div> 
          `;

        });
        $('.playlists').innerHTML = htmls.join('\n');
      },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
        get: function () {
            return this.songs[this.currentIndex];
        }
        });
    },
    handleEvents: function () {
        const _this = this;
    //     const cdWidth = cd.offsetWidth;

    // //     // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
        duration: 10000, // 10 seconds
        iterations: Infinity
        });
        cdThumbAnimate.pause();

    //     // Xử lý phóng to / thu nhỏ CD
    //     document.onscroll = function () {
    //     const scrollTop = window.scrollY || document.documentElement.scrollTop;
    //     const newCdWidth = cdWidth - scrollTop;

    //     cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
    //     cd.style.opacity = newCdWidth / cdWidth;
    //     };

        // Xử lý khi click play
        playBtn.onclick = function () {
        if (_this.isPlaying) {
            audio.pause();
        } else {
            audio.play()
            // btnIconPlay.classlist.add('active')
        }

        };

    //     // Khi song được play
        audio.onplay = function () {
        _this.isPlaying = true;
        btnIconPlay.classList.add("active");
        cdThumbAnimate.play();
        console.log(btnIconPlay)
        };

    //     // Khi song bị pause
        audio.onpause = function () {
        _this.isPlaying = false;
        btnIconPlay.classList.remove("active");
        cdThumbAnimate.pause();
        };

    //     // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
            const progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
            );
            progress.value = progressPercent;
        }
        };

    //     // Xử lý khi tua song
        progress.oninput = function(e){
        // từ số phần trăm của giây convert sang giây
        const seekTime = audio.duration / 100 * e.target.value; 
        audio.currentTime = seekTime;
        audio.play();
        };

    //     // Khi next song
        nextBtn.onclick = function () {
        if (_this.isRandom) {
            _this.playRandomSong();
        } else {
            _this.nextSong();
        }
        audio.play();
        _this.render();
        // _this.scrollToActiveSong();
        };

    //     // Khi prev song
        prevBtn.onclick = function () {
        if (_this.isRandom) {
            _this.playRandomSong();
        } else {
            _this.prevSong();
        }
        audio.play();
        _this.render();
        // _this.scrollToActiveSong();
        };

    //     // Xử lý bật / tắt random song
        randomBtn.onclick = function (e) {
        _this.isRandom = !_this.isRandom;
        _this.setConfig("isRandom", _this.isRandom);
        btnIconMix.classList.toggle("active", _this.isRandom);
        // console.log(_this.isRandom)
        };

    //     // Xử lý lặp lại một song
        repeatBtn.onclick = function (e) {
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig("isRepeat", _this.isRepeat);
        btnIconRepeat.classList.toggle("active", _this.isRepeat);
        };

    //     // Xử lý next song khi audio ended
        audio.onended = function () {
        if (_this.isRepeat) {
            audio.play();
        } else {
            nextBtn.click();
        }
        };

    //     // Lắng nghe hành vi click vào playlist
    //     playlist.onclick = function (e) {
    //         let songNode = e.target.closest('.song:not(.active)');
    //         if (!e.target.closest('.option')) {
    //           if (songNode) {
    //             _this.currentIndex = Number(songNode.dataset.index);
    //             _this.loadCurrentSong();
    //             audio.play();
    //           }
    //         }
    //       }
    },
    // scrollToActiveSong: function () {
    //     setTimeout(() => {
    //       if (this.currentIndex <= 3) {
    //         $('.song.active').scrollIntoView({
    //           behavior: 'smooth',
    //           block: 'end',
    //         });
    //       } else {
    //         $('.song.active').scrollIntoView({
    //           behavior: 'smooth',
    //           block: 'center',
    //         });
    //       }
    //     }, 300);
    //   },
    
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        
        // if ($('.song.active')) {
        //   $('.song.active').classList.remove('active');
        // }
        // const list = $$('.song');
        // list.forEach((song) => {
        //   if (song.getAttribute('data-index') == this.currentIndex) {
        //     song.classList.add('active');
        //   }
        // });
      },
    // loadConfig: function () {
    //     this.isRandom = this.config.isRandom;
    //     this.isRepeat = this.config.isRepeat;
    // },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },  
    playRandomSong: function () {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * this.songs.length);
      } while (this.currentIndex === newIndex);
      console.log(newIndex);
      this.currentIndex = newIndex;
      this.loadCurrentSong();
    },

    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        

        // // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // // Render playlist
        this.render();

        // Hiển thị trạng thái ban đầu của button repeat & random
        // randomBtn.classList.toggle("active", this.isRandom);
        // repeatBtn.classList.toggle("active", this.isRepeat);
    }
    };

    app.start();
