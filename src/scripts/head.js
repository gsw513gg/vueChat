
      var avatar = new Mavatar({
        el: "#avatar",
        width: "100px",
        height: "100px",
        fileOnchange: function(e) {
          console.log(e);
        }
      });
      function clip(e) {
        let usernameValue = document.getElementById("username").value;
        let passwordValue = document.getElementById("password").value;
        let success = document.getElementsByClassName("success")[0];

        e.preventDefault();
        avatar.imageClipper(function(data) {
          alert("裁剪成功，生成的图片已覆盖在上传框内");
          //  将图片上传至后台
          console.log(data);

          let httpurl = http + "api/registerSave.php";
          avatar.upload({
            url: httpurl,
            name: "avatar",
            data: {
              send: 1,
              username: usernameValue,
              password: passwordValue,
              userAvatar: data
            },
            success: function(responseText) {
              console.log(responseText);
              let data = JSON.parse(responseText);
              if (data.valid) {
                success.innerHTML =
                  data.message + " | <a href='login.html'>登陆</a>";
                // location.href='index.html';
              } else {
                success.innerHTML = data.message;
              }
            },
            error: function(error) {
              console.log(error);
            }
          });
        });
      }
      function reset() {
        avatar.resetImage();
      }
      //获取上传前信息
      function getInfo() {
        var fileInfo = avatar.getfileInfo();
        console.log(fileInfo);
      }
      //获取base64
      function getdata() {
        var urldata = avatar.getDataUrl();
        console.log(urldata);
      }