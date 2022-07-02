const firebase = require('../Controller/database');
const admin = require('firebase-admin');
const request = require('request')
const API_KEY="AIzaSyCEJVdBpA9a_vCtco6Tztm4E5wuMcGP7Cw"


exports.signUp = (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(422).json({
        message: "Some details are missing"
      })
    }

    const options = {
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
      },
      form: { email: req.body.email, password: req.body.password }
    };

    request(options, function (err, resp, body) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      let json = JSON.parse(body);
      if (json.error) {
        return res.status(200).json({ message: json.error.message });
      }
      var user = {
        name: req.body.username,
        contactno: req.body.contactno,
        uid: json.localId,
        email: req.body.email,
        password: req.body.password,
        description: req.body.description
      }
      firebase.database().ref('users/' + user.uid).set(user).catch(error => {
        return res.status(500).json({ message: error.message });
      });
      firebase.auth().setCustomUserClaims(user.uid, {
        customUserClaims: { type: 'administrator' }
      }).then(() => console.log('done'))

      return res.status(200).json({ idToken: json.idToken, message: "User Signup successfully" })
    });

  } catch (err) {
    return res.status(500).json({ message: error.message })
  }


}

exports.signIn = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      message: "Some details are missing"
    })
  }

  const options = {
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'User-Agent': 'my-reddit-client'
    },
    form: { email: req.body.email, password: req.body.password, returnSecureToken: true }
  };

  request(options, function (err, resp, body) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    let json = JSON.parse(body);
    if (json.error) {
      return res.status(200).json({ message: json.error.message });
    }
    return res.status(200).json({ idToken: json.idToken, message: "User Login successfully" })
  });




}

exports.getAllUsers = async (req, res) => {
  try {
    const ref = firebase.database().ref('users')
    ref.on('value', (snapshot) => {

      let data = snapshot.val();
      let result = Object.values(data);
      return res.status(200).json({ result: result })

    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }




}
