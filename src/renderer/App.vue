<template>
  <div id="app" dark>

  <v-app>

    <v-toolbar
      color="blue-grey"
      dark 
      fixed
      app
      :style="colorGradient"
      clipped-right>
      <img src="static/logo_aunna.png" title="Aunna" alt="Aunna Logo" style="width: 150px">
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>Cards</v-toolbar-title>
      <v-spacer></v-spacer>      
    </v-toolbar>

    <v-content :style="colorGradient2"> 
      
      <v-container fluid>
          <router-view></router-view>
      </v-container>
     
    </v-content>

    <v-footer color="blue-grey" class="white--text" :style="colorGradient" app>
      <i v-if="socket_connected" class="material-icons" style="color: #31bf31; float: left; margin-right: 5px;">compare_arrows</i><span v-if="socket_connected" style="padding-top: 3px;"> Conectado</span>      
      <span v-if="!socket_connected"><i class="material-icons" style="color: red; float: left; margin-right: 5px">error</i> No conectado [Nota: se necesita conexión socket.io en el puerto {{port}}]</span>
      <v-spacer></v-spacer>
      <span>AU<b>N</b>NA <b>&copy;</b> 2018</span>
    </v-footer>
 
  </v-app>

  </div>
</template>

<script>

import axios from 'axios';
import moment from 'moment';
import VueJsonPretty from 'vue-json-pretty'

  export default {
    name: 'cards',
    components: { VueJsonPretty },
    data: () => ({   
      port: 3500,         
      drawer: false, 
      
      socket_connected: false 
    }),

    props: {
      source: String
    },  

    sockets:{
      connect: function(){
        console.log('socket connected');
        this.socket_connected = true
      }   
    },

    created: function () {

      /* OBTENCIÓN DE DATOS */
      try {
        // axios.get('http://127.0.0.1:'+this.port+'/getAllAGIEvents')
        //   .then(response => {            
        //     console.log(response.data);
            
        //   })
        //   .catch(e => {
        //     this.socket_connected = false;
        //     console.log(e);
        //   })   
      }catch(e){
        this.socket_connected = false
      }       
      
      this.$options.sockets.new_event = (data) => {
          console.log('Socket event:', data)          
          this.newEvent(data);
      }           

    } ,

    computed: {
      colorGradient(){
        //return 'background: linear-gradient(45deg, rgb(48, 73, 107), rgb(48, 184, 210));'
        return 'background: linear-gradient(45deg,#476892,#59355D)'
      },
      colorGradient2(){
        //return 'background: linear-gradient(45deg,#30496B,#30B8D2)'
        return 'background: linear-gradient(45deg,#476892,#59355D)'
        //return 'background: linear-gradient(rgb(143, 49, 10), rgb(14, 5, 1) 85%)' //Spotify
        //return 'background: white'
      }, 
    },

    methods: {
      newEvent: function (data){
        console.log('newEvent:', data);       
      },        
    },

    filters: {
      formatDate: function (value) {
        if (value) {
          return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
        }
      }
    }

  }


</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>

<style scope>
 th {
  min-width: 175px;
 }
 .errorResponse {
  background: #e57373;
  color: white;
 }
 .errorResponse:hover {  
  color: #000;
 }
 .avisoResponse {
  background: orange;
  color: white;
 }
 .avisoResponse:hover {  
  color: #000;
 }  
 /*Color de los datos del json en la modal*/
.vjs__tree .vjs__value__string {
    color: #1e4254 !important;
    font-weight: bold;
}  
</style>