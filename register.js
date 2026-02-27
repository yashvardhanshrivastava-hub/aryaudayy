<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDbZ17nBpVdpCV99hVERnJg6tbNyBxS2P4",
    authDomain: "aryauday-d2309.firebaseapp.com",
    databaseURL: "https://aryauday-d2309-default-rtdb.firebaseio.com",
    projectId: "aryauday-d2309",
    storageBucket: "aryauday-d2309.firebasestorage.app",
    messagingSenderId: "865852225907",
    appId: "1:865852225907:web:779ca558b240db2dae2d06",
    measurementId: "G-DTFPP0Y19Z"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
