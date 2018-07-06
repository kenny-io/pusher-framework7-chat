
   const pusher = new Pusher('Your-Pusher-Key', {
    cluster: 'eu',
    encrypted: true,
  });
  
   const channel = pusher.subscribe('chat');
   var states = {
    name: '',
    msgs: []
  };

  channel.bind('message', data => {
      console.log(data)
    var type = data.name == states.name ? 'sent':'received'
    var name = type == 'sent'? states.name : data.name;
    states.msgs.push({name:name, text:data.text, type:type});
  });


(function(){

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
         console.log("clicked") 
        var message = {
            name: this.name,
            text: text 
        }
        axios.post('http://localhost:6000/message', message);

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

document.addEventListener('deviceready', init, false)

})();
