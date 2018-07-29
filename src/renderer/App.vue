<template>

  <v-app class="desktop_verde">

    <v-toolbar
      dark 
      fixed
      app
      style="background: transparent; z-index: 100;padding-right: 10px;"
      class="desktop_verde"
      clipped-right>
      <img src="static/logo_aunna.png" title="Aunna" alt="Aunna Logo" style="width: 150px">
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <!-- <v-toolbar-title>Cards</v-toolbar-title> -->
      <v-spacer></v-spacer>     

      <!-- Menú superior derecho -->
      <v-scale-transition>
        <v-btn
        fab
        dark
        small
        color="transparent"
        v-if="menu"
        class=""
        >
          <v-icon>search</v-icon>
        </v-btn>
      </v-scale-transition>

      <v-scale-transition>
        <v-btn
        fab
        dark
        small
        color="transparent"
        v-if="menu"
        class=""
        >
          <v-icon>filter_list</v-icon>
        </v-btn>
      </v-scale-transition>

      <v-scale-transition>
        <v-btn
        fab
        dark
        small
        color="transparent"
        v-if="menu"
        class=""
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </v-scale-transition>

      <v-scale-transition>
        <v-btn
        fab
        dark
        small
        color="transparent"
        v-if="menu"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-scale-transition>

      <v-scale-transition> 
        <v-btn
        fab
        dark
        small
        color="transparent"
        v-if="menu"
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </v-scale-transition>

      <v-scale-transition> 
        <v-btn
        fab
        dark
        small
        color="transparent"
        v-if="menu"
        >
          <v-icon>settings</v-icon>
        </v-btn>
      </v-scale-transition>

      <v-btn
      v-model="menu"
      style="background: transparent"
      dark
      fab
      small
      @click="menu = !menu"
      >
        <v-icon v-if="!menu">more_vert</v-icon>
        <v-icon v-else>keyboard_arrow_right</v-icon>
      </v-btn>



    </v-toolbar>

    <v-content> 
      
      <v-container fluid style="padding-top: 0px;">
          <router-view></router-view>
      </v-container>
     
    </v-content>

    <v-footer color="blue-grey" class="white--text desktop_verde" app>
      <i v-if="socket_connected" class="material-icons" style="color: teal; float: left; margin-right: 5px;">compare_arrows</i><span v-if="socket_connected" style="padding-top: 3px;"> Conectado</span>      
      <span v-if="!socket_connected"><i class="material-icons" style="color: red; float: left; margin-right: 5px">error</i> No conectado [Nota: se necesita conexión socket.io en el puerto {{port}}]</span>
      <v-spacer></v-spacer>
      <span>AU<b>N</b>NA <b>&copy;</b> 2018</span>
    </v-footer>
 
  </v-app>

</template>

<script>
import axios from "axios";
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";
import $ from "jquery";

export default {
  name: "cards",
  components: { VueJsonPretty },
  data: () => ({
    port: 3500,
    drawer: false,

    socket_connected: false,

    //Para el menú superior derecho
    menu: true
  }),

  props: {
    source: String
  },

  sockets: {
    connect: function() {
      console.log("socket connected");
      this.socket_connected = true;
    }
  },

  mounted(){

  },

  created: function() {

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
    } catch (e) {
      this.socket_connected = false;
    }

    this.$options.sockets.new_event = data => {
      console.log("Socket event:", data);
      this.newEvent(data);
    };
  },

  computed: {
    colorGradient() {
      //return 'background: linear-gradient(45deg, rgb(48, 73, 107), rgb(48, 184, 210));'
      return "background: linear-gradient(45deg,#476892,#59355D)";
    },
    colorGradient2() {
      //return 'background: linear-gradient(45deg,#30496B,#30B8D2)'
      return "background: linear-gradient(45deg,#476892,#59355D)";
      //return 'background: linear-gradient(rgb(143, 49, 10), rgb(14, 5, 1) 85%)' //Spotify
      //return 'background: white'
    }
  },

  methods: {
    newEvent: function(data) {
      console.log("newEvent:", data);
    }
  },

  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY hh:mm:ss");
      }
    }
  }

};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
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
.desktop_verde {
  background-image: url("/static/fondo_verde.png") !important;
  background-attachment: fixed !important;
  background-size: cover !important;
}
.toolbar {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}

.speed-dial--top {
  top: 5px !important;
}
.speed-dial--right {
  right: 5px !important;
}

button:focus {
  outline: 0 !important;
  border: 0px !important;
}
</style>