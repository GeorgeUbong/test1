document.addEventListener("DOMContentLoaded", function () {
    const cameraFeed = document.getElementById("camera-feed");
    const captureButton = document.getElementById("capture-button");
    const saveButton = document.getElementById("save-button");
    const takeAnotherButton = document.getElementById("take-another-button");
    const canvas = document.getElementById("photo-canvas");
    const previewImage = document.getElementById("preview-image");
    const ctx = canvas.getContext("2d");
  
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        cameraFeed.srcObject = stream;
      })
      .catch(function (error) {
        console.error("Unable access camera:", error);
      });
  
    captureButton.addEventListener("click", function () {
      // Draw the video frame to the canvas
      canvas.width = cameraFeed.videoWidth;
      canvas.height = cameraFeed.videoHeight;
      ctx.drawImage(cameraFeed, 0, 0, cameraFeed.videoWidth, cameraFeed.videoHeight);
  
      // Show the preview image and buttons
      previewImage.src = canvas.toDataURL("image/png");
      previewImage.style.display = "block";
      takeAnotherButton.style.display = "block";
      saveButton.style.display = "block";
      captureButton.style.display = "none";
    });
  
    takeAnotherButton.addEventListener("click", function () {
      // Reset the interface to capture another photo
      previewImage.style.display = "none";
      takeAnotherButton.style.display = "none";
      saveButton.style.display = "none";
      captureButton.style.display = "block";
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    });
  
    saveButton.addEventListener("click", function () {
      const imageData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageData;
      link.download = "captured_photo.png";
      link.click();
    });
  });
  