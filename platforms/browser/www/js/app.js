 import axios from 'axios';
 import pusher from 'pusher-js';

(function(){

  var states = {
    name: '',
    msgs: []
  };

  // const pusher = new Pusher('bb39d58f0fb494f894ad', {
  //   cluster: 'eu',
  //   encrypted: true,
  // });
  // const channel = pusher.subscribe('chat');

//   function initPusherMsg(){
//   channel.bind('message', data => {
//     var type = data.message.name == states.name ? 'sent':'received'
//     var name = type = 'sent'? states.name : data.message.name;
//     states.msgs.push({name:name, text:data.message.text, type:type});
//   });
// }

  // function sendMessage(){ 
  //   if (e.keyCode === 13) {
  //       message : {
  //         name: this.name
  //         text: text      
  //     };
  //     axios.post('http://localhost:5000/message', message);
  //   } else {
  //     this.setState({ text: e.target.value });
  //   }

  // }

  function init(){
    // Init F7 Vue Plugin
  Vue.use(Framework7Vue)
  
  // Init Page Components
  Vue.component('page-chat', {
    template: '#page-chat',
    data: function(){
      return states;
    },

    methods: {
      onSend: function(text, clear){
        if( text.trim().length === 0 ) return;
          //sendMessage();
        if( typeof clear == 'function' ) clear()
      }
    }
  });
  
    // Init App
  new Vue({
    el: '#app',
    data: function(){
      return states;
    },
    methods: {
      enterChat: function(){
        if(this.name.trim().length === 0 ){
          alert(" Enter your name ...")
          return false;
        }

        this.msgs.length = 0;
        this.$f7.mainView.router.load({url:'/chat/'});
        //initPusherMsg();
      }
    },
  
    // Init Framework7 by passing parameters here
    framework7: {
      root: '#app',
      /* Uncomment to enable Material theme: */
      // material: true,
      routes: [
        {
          path: '/chat/',
          component: 'page-chat'
        }
      ],
    }
  });
  
  }  
  // Handle device ready event
  // Note: You may want to check out the vue-cordova package on npm for cordova specific handling with vue - https://www.npmjs.com/package/vue-cordova
  document.addEventListener('deviceready', init, false)
  
})();