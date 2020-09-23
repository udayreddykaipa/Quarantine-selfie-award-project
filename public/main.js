function uploadImg() {
    //diable upload btn
    var database = firebase.database().ref();
    document.getElementById("uploadImgBtn").disabled = true
    var file = document.getElementById("exampleFormControlFile1").files[0]
    if ((document.getElementById("exampleFormControlFile1").files.length) < 1 || ) {
      //warning 

      document.getElementById("uploadImgBtn").disabled = false
      $(document).ready(function () {
        $('.toast').toast({ delay: 3000 })
        $('#alertmsg').html("Please select media")
        $('.toast').toast('show');
      });
    }
    else {
      // get fid and upload image
      var storageRef = firebase.storage().ref()
      // database.
      var metadata = {};
      var today = new Date();//time stamp for image
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + "," + today.getMinutes() + "," + today.getSeconds();
      var timestamp = date + ' ' + time;
      var uploadTask = storageRef.child('UserUploads/' + timestamp + file.name).put(file, metadata);//upload image
      uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            document.getElementById("uploadImgBtn").disabled = false
            $(document).ready(function () {
              $('.toast').toast({ delay: 3000 })
              $('#alertmsg').html("Upload Paused")
              $('.toast').toast('show');
            });
  
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            document.getElementById("uploadImgBtn").disabled = false
            $(document).ready(function () {
              $('.toast').toast({ delay: 3000 })
              $('#alertmsg').html("Uploading ... it may take time based on file size.")
              $('.toast').toast('show');
            });
  
            break;
        }
      }, function (error) {
        console.log(error);
        $(document).ready(function () {
          $('.toast').toast({ delay: 3000 })
          $('#alertmsg').html("Error uploading, Try again" + error)
          $('.toast').toast('show');
        }); 
        document.getElementById("uploadImgBtn").disabled = false
      }, function () {
        // get the uploaded image url back 
        uploadTask.snapshot.ref.getDownloadURL().then(
          function (downloadURL) {
            // You get your url from here 

            console.log('File available at', downloadURL);
            $(document).ready(function () {
              $('.toast').toast({ delay: 3000 })
              $('#alertmsg').html("Upload successful")
              $('.toast').toast('show');
            });
            
  
          });
  
      });
  
    }
  
  }
  